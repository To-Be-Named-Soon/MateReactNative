import *  as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen from './components/screens/TutorialScreen';
import Login from './components/screens/LoginScreen';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null | undefined;
}
type AuthAction =
  | { type: "RESTORE_TOKEN", token: string | null }
  | { type: "SIGN_IN", token: string }
  | { type: "SIGN_OUT" };

type AuthContext = {
  signIn: (data: any) => Promise<void>
  signOut: () => void
  signUp: (data: any) => Promise<void>
};

const Stack = createNativeStackNavigator();
const AuthContext = React.createContext(null as unknown as AuthContext);

const App = () => {
  const [state, dispatch] = React.useReducer<React.Reducer<AuthState, AuthAction>>(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {

      }

      if (userToken) {
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      }
    };
    bootstrapAsync();
  }, []);


  const authContext = React.useMemo<AuthContext>(() => ({
    signIn: async (data) => {
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async (data) => {
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
    }
  }), []);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator initialRouteName="Login">
          {state.userToken == null ? (
            <Stack.Screen
              name="Login"
              component={Login} />
          ) : (
            <Stack.Screen
              name="Tutorial"
              component={TutorialScreen} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;

