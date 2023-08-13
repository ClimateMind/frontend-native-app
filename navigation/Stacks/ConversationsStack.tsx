import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConversationsIntroScreen from '../../screens/UserAAuthorizedScreens/ConversationsIntroScreen/ConversationsIntroScreen';
import ConversationsScreen from '../../screens/UserAAuthorizedScreens/ConversationsScreen/ConversationsScreen';

export type ConversationsStackParams = {
  ConversationsIntroScreen: undefined;
  ConversationsScreen: undefined;
};

const Stack = createNativeStackNavigator<ConversationsStackParams>();

function ConversationsStack() {
  return (
    <Stack.Navigator
      initialRouteName="ConversationsIntroScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ConversationsIntroScreen" component={ConversationsIntroScreen} />
      <Stack.Screen name="ConversationsScreen" component={ConversationsScreen} />
    </Stack.Navigator>
  );
}

export default ConversationsStack;
