import *  as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen from './components/screens/TutorialScreen';
import Login from './components/screens/LoginScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login} />
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

