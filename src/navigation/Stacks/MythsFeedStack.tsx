import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MythsFeedScreen from 'src/screens/UserAAuthorizedScreens/MythsFeedScreen/MythsFeedScreen';
import MythDetailsScreen from 'src/screens/UserAAuthorizedScreens/MythDetailsScreen/MythDetailsScreen';
import Myth from 'src/types/Myth';

export type MythsFeedStackParams = {
  MythsFeedScreen: undefined;
  MythDetailsScreen: { myth: Myth };
};

const Stack = createNativeStackNavigator<MythsFeedStackParams>();

function MythsFeedStack() {
  return (
    <Stack.Navigator
      initialRouteName="MythsFeedScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MythsFeedScreen" component={MythsFeedScreen} />
      <Stack.Screen name="MythDetailsScreen" component={MythDetailsScreen} />
    </Stack.Navigator>
  );
}

export default MythsFeedStack;
