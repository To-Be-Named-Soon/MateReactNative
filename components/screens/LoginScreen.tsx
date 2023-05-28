import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button } from "react-native";

type LoginScreenProps = {
  route: RouteProp<ParamListBase, 'Login'>;
  navigation: NavigationProp<ParamListBase, 'Login'>;
};

function Login({ navigation }: LoginScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <Button title="Go to Tutorial" onPress={() => navigation.navigate('Tutorial')} />
    </View>
  )
}

export default Login;
