import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, Button, Linking, Pressable} from 'react-native';

type LoginScreenProps = {
  route: RouteProp<ParamListBase, 'Login'>;
  navigation: NavigationProp<ParamListBase, 'Login'>;
};

function LoginScreen({navigation}: LoginScreenProps) {
  const authFlow = async () => {
    try {
      await Linking.openURL('http://localhost:8080/auth/google/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View className="flex items-center justify-center h-full">
      {/*<View className="bg-slate-200 rounded-md">
        <Button
          title="Go to Tutorial"
          onPress={() => navigation.navigate('Tutorial')}
        />
  </View>*/}
      <View className="bg-slate-200 rounded-md">
        <Button title="Sign in with Google" onPress={authFlow} />
      </View>
    </View>
  );
}

export default LoginScreen;
