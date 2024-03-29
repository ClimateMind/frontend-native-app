import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Tab Screens
import ProfileScreen from 'src/screens/UserAAuthorizedScreens/ProfileScreen';
import PersonalValuesScreen from 'src/screens/UserAAuthorizedScreens/PersonalValuesScreen';
import ClimateFeedStack from './Stacks/ClimateFeedStack';
import SolutionsFeedStack from './Stacks/SolutionsFeedStack';
import MythsFeedStack from './Stacks/MythsFeedStack';
import ConversationsStack from './Stacks/ConversationsStack';

import { TalkMenuButtonEvent, analyticsService } from 'src/services';
import { useAppSelector } from 'src/store/hooks';
import { CmTypography } from '@shared/components';

export type BottomTabsNavigationParams = {
  ProfileScreen: undefined;
  ClimateFeedStack: undefined;
  SolutionsFeedStack: { screen: 'SolutionDetailsScreen' } | undefined;
  MythsFeedStack: undefined;
  ConversationsStack: undefined;
  PersonalValuesScreen: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabsNavigationParams>();

function UserAAuthorizedTabsNavigation() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Tabs.Navigator
      initialRouteName="ClimateFeedStack"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#07373b',
        tabBarInactiveTintColor: '#77AAAF',
        tabBarLabelStyle: {
          marginBottom: 5,
          fontFamily: 'nunito',
        },
        tabBarStyle: {
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="ClimateFeedStack"
        component={ClimateFeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="SolutionsFeedStack"
        component={SolutionsFeedStack}
        options={{
          tabBarLabel: 'Actions',
          tabBarIcon: ({ color }) => <Ionicons name="bulb-sharp" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="ConversationsStack"
        component={ConversationsStack}
        options={{
          tabBarLabel: 'Talk',
          tabBarIcon: ({ color }) => <Entypo name="chat" size={24} color={color} />,
        }}
        listeners={() => ({
          tabPress: () => {
            analyticsService.postEvent(TalkMenuButtonEvent);
          },
        })}
      />

      <Tabs.Screen
        name="MythsFeedStack"
        component={MythsFeedStack}
        options={{
          tabBarLabel: 'Myths',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat-alert" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <CmTypography variant="h3" style={{ color, width: 100 }}>
              {(user.firstName[0] + user.lastName[0]).toUpperCase()}
            </CmTypography>
          ),
        }}
      />

      <Tabs.Screen
        name="PersonalValuesScreen"
        component={PersonalValuesScreen}
        options={{
          // Hide screen from tab bar
          tabBarButton: () => null,
        }}
      />

    </Tabs.Navigator>
  );
}

export default UserAAuthorizedTabsNavigation;
