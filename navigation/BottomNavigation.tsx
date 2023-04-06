import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Tab Screens
import ProfileScreen from "../screens/tabs/ProfileScreen";
import ClimateFeedScreen from "../screens/tabs/ClimateFeedScreen";
import SolutionsFeedScreen from "../screens/tabs/SolutionsFeedScreen";
import MythsFeedScreen from "../screens/tabs/MythsFeedScreen";
import ConversationsIntroScreen from "../screens/tabs/ConversationsIntroScreen";

export type BottomNavigationParams = {
  ProfileScreen: undefined;
  ClimateFeedScreen: undefined;
  SolutionsFeedScreen: undefined;
  MythsFeedScreen: undefined;
  ConversationsIntroScreen: undefined;
};

const Tabs = createBottomTabNavigator<BottomNavigationParams>();

function BottomNavigation() {
  return (
    <Tabs.Navigator
    initialRouteName='ClimateFeedScreen'
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name='ProfileScreen' component={ProfileScreen} />
      <Tabs.Screen name='ClimateFeedScreen' component={ClimateFeedScreen} />
      <Tabs.Screen name='SolutionsFeedScreen' component={SolutionsFeedScreen} />
      <Tabs.Screen name='MythsFeedScreen' component={MythsFeedScreen} />
      <Tabs.Screen name='ConversationsIntroScreen' component={ConversationsIntroScreen} />
    </Tabs.Navigator>
  );
}

export default BottomNavigation;
