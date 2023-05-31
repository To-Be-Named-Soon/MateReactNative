import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button, Linking } from "react-native";
import { AuthContext } from '../../App';

type LoginScreenProps = {
  route: RouteProp<ParamListBase, 'Login'>;
  navigation: NavigationProp<ParamListBase, 'Login'>;
};

function Login({ navigation }: LoginScreenProps) {
  const { siginIn } = React.useContext(AuthContext);
  const [error, setError] = React.useState<any>();
  const authFlow = async () => {
    try {
      //const data = await Linking.openURL("https://mate.fly.dev/auth/google/login");
      const data = await Linking.openURL("http://localhost:8080/auth/google/login");
      setError(data)
    } catch (e) {
      setError(e);
      console.error(e);
    }
  }
  React.useEffect(() => {
    const doWait = () => {
      Linking.getInitialURL().then(ev => {
        console.warn(ev)
      })
    };
    Linking.addEventListener('url', doWait);
    return () => Linking.removeAllListeners('url');
  }, [navigation])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <Text>{error}</Text>
      <Button title="Go to Tutorial" onPress={() => navigation.navigate('Tutorial')} />
      <Button title="Sign in with Google" onPress={authFlow} />
    </View>
  )
}

export default Login;
