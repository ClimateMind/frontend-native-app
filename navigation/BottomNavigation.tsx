import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '../store/hooks';

// Tab Screens
import ProfileScreen from '../screens/tabs/ProfileScreen/ProfileScreen';
import ClimateFeedStack from './ClimateFeedStack';
import SolutionsFeedStack from './SolutionsFeedStack';
import MythsFeedStack from './MythsFeedStack';
import ConversationsStack from './ConversationsStack';
import PersonalValuesScreen from '../screens/drawer/PersonalValuesScreen/PersonalValuesScreen';

export type BottomNavigationParams = {
  ProfileScreen: undefined;
  ClimateFeedStack: undefined;
  SolutionsFeedStack: undefined;
  MythsFeedStack: undefined;
  ConversationsStack: undefined;
  PersonalValuesScreen: undefined;
};

const Tabs = createBottomTabNavigator<BottomNavigationParams>();

function BottomNavigation() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Tabs.Navigator initialRouteName="ClimateFeedStack" screenOptions={
      {
        headerShown: false,
        tabBarActiveTintColor: '#07373b',
        tabBarInactiveTintColor: '#77AAAF',
        tabBarLabelStyle: {
          marginBottom: 5,
          fontFamily: 'nunito-medium',
        },
        tabBarStyle: {
          height: 55,
        }
      }
    }
    >
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color, fontWeight: 'bold' }}>
              {user.firstName[0] + user.lastName[0]}
            </Text>
          ),
        }}
      />
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
        name="MythsFeedStack"
        component={MythsFeedStack}
        options={{
          tabBarLabel: 'Myths',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat-alert" size={24} color={color} />,
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

export default BottomNavigation;
