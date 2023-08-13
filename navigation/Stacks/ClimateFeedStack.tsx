import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ClimateFeedScreen from '../../screens/UserAAuthorizedScreens/ClimateFeedScreen/ClimateFeedScreen';
import ClimateDetailsScreen from '../../screens/UserAAuthorizedScreens/ClimateDetailsScreen/ClimateDetailsScreen';
import ClimateEffect from '../../types/ClimateEffect';

export type ClimateFeedStackParams = {
  ClimateFeedScreen: undefined;
  ClimateDetailsScreen: { climateEffect: ClimateEffect };
};

const Stack = createNativeStackNavigator<ClimateFeedStackParams>();

function ClimateFeedStack() {
  return (
    <Stack.Navigator
      initialRouteName="ClimateFeedScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ClimateFeedScreen" component={ClimateFeedScreen} />
      <Stack.Screen name="ClimateDetailsScreen" component={ClimateDetailsScreen} />
    </Stack.Navigator>
  );
}

export default ClimateFeedStack;
