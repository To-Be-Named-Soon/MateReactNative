import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button, Image } from "react-native";
import { AuthContext } from '../../App';

type UserScreenProps = {
  route: RouteProp<ParamListBase, 'User'>;
  navigation: NavigationProp<ParamListBase, 'User'>;
};

function UserScreen({ navigation }: UserScreenProps) {
  const { user, signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>My Profile</Text>
      {user &&
        <>
          <Image source={{ uri: user?.profile_picture_url }}
            style={{ width: 400, height: 400 }} />
          <Text>{user.name}</Text>
          <Text>{user.age}</Text>
          <Text>{user.locale}</Text>
        </>
      }
      <Button title="Sign out" onPress={signOut} />
    </View>
  )
}

export default UserScreen;
