import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button, Linking } from "react-native";

type LoginScreenProps = {
  route: RouteProp<ParamListBase, 'Login'>;
  navigation: NavigationProp<ParamListBase, 'Login'>;
};

function LoginScreen({ navigation }: LoginScreenProps) {
  const authFlow = async () => {
    try {
      await Linking.openURL("http://localhost:8080/auth/google/login");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <Button title="Go to Tutorial" onPress={() => navigation.navigate('Tutorial')} />
      <Button title="Sign in with Google" onPress={authFlow} />
    </View>
  )
}

export default LoginScreen;
