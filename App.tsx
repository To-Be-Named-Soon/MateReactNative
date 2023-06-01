import *  as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen from './components/screens/TutorialScreen';
import LoginScreen from './components/screens/LoginScreen';
import * as SecureStore from 'expo-secure-store';
import UserScreen from './components/screens/UserScreen';
import queryString from 'query-string';
import { Linking } from 'react-native';

type AuthState = {
  isSignedIn: boolean;
  accessToken: AuthToken;
}
type AuthAction =
  | { type: "SIGN_IN", accessToken: AuthTokenStrict }
  | { type: "SIGN_OUT" };

type User = {
  name: string,
  profile_picture_url: string, // TODO convert snake to camel case
  age: number,
  locale: string
};


type AuthContext = {
  signIn: (data: { accessToken: AuthToken, refreshToken: AuthToken }) => Promise<void>
  signOut: () => void,
  user: User | null
};

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext(null as unknown as AuthContext);

export type AuthToken = AuthTokenStrict | null;
export type AuthTokenStrict = string;

const App = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [state, dispatch] = React.useReducer<React.Reducer<AuthState, AuthAction>>(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            isSignedIn: true,
            accessToken: action.accessToken,
          };
        case 'SIGN_OUT':
          return {
            isSignedIn: false,
            accessToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isSignedIn: false,
      accessToken: null,
    }
  );

  React.useEffect(() => {
    restoreData();
    Linking.addEventListener('url', handleSignInEvent);
    return () => Linking.removeAllListeners('url');
  }, []);

  const handleSignInEvent = (ev: { url: string | null }) => {
    if (!ev.url) {
      console.error(`Url is missing: ${ev.url}`)
      return;
    }
    const urlSearchParams = queryString.parseUrl(ev.url).query;
    if (!(typeof urlSearchParams['access_token'] == 'string' && typeof urlSearchParams['refresh_token'] == 'string')) {
      console.error('Tokens missing or invalid format') // TODO: handle properly
      return;
    }
    authContext.signIn({
      accessToken: urlSearchParams['access_token'] as AuthToken,
      refreshToken: urlSearchParams['refresh_token'] as AuthToken
    })
  }

  const restoreData = async () => {
    const [accessToken, user] = await Promise.all([
      SecureStore.getItemAsync('accessToken'),
      SecureStore.getItemAsync('user')
    ]);
    if (user) {
      setUser(JSON.parse(user))
    }
    if (accessToken) {
      dispatch({ type: "SIGN_IN", accessToken })
    }
  }

  const getUser = async (accessToken: AuthTokenStrict) => {
    try {
      const userReq = await fetch("http://localhost:8080/api/user", {
        //method: 'POST', \\ why get, fix in backend, post_details has to be called first, fix that as well
        headers: { 'AUTHORIZATION': accessToken }
      });
      const user: User = await userReq.json();
      setUser(user);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
    } catch (e) {
      console.error(`Could not fetch user ${e}`)
    }
  }

  const authContext = React.useMemo<AuthContext>(() => ({
    signIn: async (tokens: { accessToken: AuthToken, refreshToken: AuthToken }) => {
      let { accessToken, refreshToken } = tokens
      if (!(accessToken && refreshToken)) {
        return; // TODO handle this case
      }
      await Promise.all([
        SecureStore.setItemAsync('refreshToken', accessToken),
        SecureStore.setItemAsync('accessToken', accessToken),
      ]);
      dispatch({ type: 'SIGN_IN', accessToken });
      getUser(accessToken);
    },
    signOut: async () => {
      await Promise.all([
        SecureStore.deleteItemAsync('refreshToken'),
        SecureStore.deleteItemAsync('accessToken'),
        SecureStore.deleteItemAsync('user'),
      ]);
      dispatch({ type: 'SIGN_OUT' })
    },
    user
  }), [user]);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator initialRouteName="Login">
          {state.isSignedIn ? (
            <Stack.Screen
              name="User"
              component={UserScreen} />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen} />
          )}
          <Stack.Screen
            name="Tutorial"
            component={TutorialScreen} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;

