import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import { AuthContext } from '../../App';

type UserScreenProps = {
  route: RouteProp<ParamListBase, 'User'>;
  navigation: NavigationProp<ParamListBase, 'User'>;
};

function UserScreen({ navigation }: UserScreenProps) {
  const { user, signOut } = React.useContext(AuthContext);

  return (
    <View className="flex items-center">
      <Image
        className="m-2 bg-slate-400 rounded-full"
        source={{ uri: user?.profile_picture_url }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{user?.name}</Text>
      <Text>{user?.locale}</Text>
      <View className="flex gap-2 mt-6 mb-4">
        <Text>Age</Text>
        <TextInput placeholder="Age" className="p-2 w-60 rounded-md border" />
        <Text>Residence</Text>
        <TextInput
          placeholder="Residence"
          className="p-2 w-60 rounded-md border"
        />
        <Text>Bio</Text>
        <TextInput
          placeholder="Bio"
          className="max-h-20 h-full p-2 w-60 rounded-md border"
          multiline
        />
        <Text>Languages</Text>
        <TextInput
          placeholder="Languages comma separated"
          className="p-2 w-60 rounded-md border"
          multiline
        />
        <Text>Interests</Text>
        <TextInput
          placeholder="Interests comma separated"
          className="p-2 w-60 rounded-md border"
          multiline
        />
        <Text>Countries</Text>
        <TextInput
          placeholder="Countries visited comma separated"
          className="p-2 w-60 rounded-md border"
          multiline
        />
      </View>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default UserScreen;
