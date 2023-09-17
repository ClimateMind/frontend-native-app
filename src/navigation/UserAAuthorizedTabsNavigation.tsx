import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Tab Screens
import ProfileScreen from 'src/screens/UserAAuthorizedScreens/ProfileScreen/ProfileScreen';
import PersonalValuesScreen from 'src/screens/UserAAuthorizedScreens/PersonalValuesScreen/PersonalValuesScreen';
import ClimateFeedStack from './Stacks/ClimateFeedStack';
import SolutionsFeedStack from './Stacks/SolutionsFeedStack';
import MythsFeedStack from './Stacks/MythsFeedStack';
import ConversationsStack from './Stacks/ConversationsStack';

import { useAppSelector } from 'src/store/hooks';
import Headline3 from 'src/components/TextStyles/Headline3';

export type BottomTabsNavigationParams = {
  ProfileScreen: undefined;
  ClimateFeedStack: undefined;
  SolutionsFeedStack: undefined;
  MythsFeedStack: undefined;
  ConversationsStack: undefined;
  PersonalValuesScreen: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabsNavigationParams>();

function UserAAuthorizedTabsNavigation() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Tabs.Navigator
      initialRouteName='ClimateFeedStack'
      backBehavior='history'
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
        }
      }}
    >
      <Tabs.Screen
        name='ClimateFeedStack'
        component={ClimateFeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name='SolutionsFeedStack'
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
      />

      <Tabs.Screen
        name='MythsFeedStack'
        component={MythsFeedStack}
        options={{
          tabBarLabel: 'Myths',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat-alert" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Headline3 style={{ color, width: 100 }}>
              {(user.firstName[0] + user.lastName[0]).toUpperCase()}
            </Headline3>
          ),
        }}
      />

      <Tabs.Screen
        name='PersonalValuesScreen'
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
