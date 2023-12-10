import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SolutionsFeedScreen from 'src/screens/UserAAuthorizedScreens/SolutionsFeedScreen';
import SolutionDetailsScreen from 'src/screens/UserAAuthorizedScreens/SolutionDetailsScreen';
import Solution from 'src/types/Solution';

export type SolutionsFeedStackParams = {
  SolutionsFeedScreen: undefined;
  SolutionDetailsScreen: { solution: Solution };
};

const Stack = createNativeStackNavigator<SolutionsFeedStackParams>();

function SolutionsFeedStack() {
  return (
    <Stack.Navigator
      initialRouteName="SolutionsFeedScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SolutionsFeedScreen" component={SolutionsFeedScreen} />
      <Stack.Screen name="SolutionDetailsScreen" component={SolutionDetailsScreen} />
    </Stack.Navigator>
  );
}

export default SolutionsFeedStack;
