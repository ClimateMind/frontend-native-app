import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useAppSelector } from '../store/hooks';

// Tab Screens
import ProfileScreen from '../screens/tabs/ProfileScreen/ProfileScreen';
import ClimateFeedStack from './ClimateFeedStack';
import SolutionsFeedStack from './SolutionsFeedStack';
import MythsFeedStack from './MythsFeedStack';
import ConversationsStack from './ConversationsStack';

export type BottomNavigationParams = {
  ProfileScreen: undefined;
  ClimateFeedStack: undefined;
  SolutionsFeedStack: undefined;
  MythsFeedStack: undefined;
  ConversationsStack: undefined;
};

const Tabs = createBottomTabNavigator<BottomNavigationParams>();

function BottomNavigation() {
  const user = useAppSelector(state => state.auth.user);
  
  return (
    <Tabs.Navigator initialRouteName='ClimateFeedStack' screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Text>{user.firstName[0] + user.lastName[0]}</Text>
        }}
      />
      <Tabs.Screen
        name='ClimateFeedStack'
        component={ClimateFeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />
        }}
      />
      {/* <Tabs.Screen
        name='ClimateFeedScreen'
        component={ClimateFeedScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />
        }}
      /> */}
      <Tabs.Screen
        name='SolutionsFeedStack'
        component={SolutionsFeedStack}
        options={{
          tabBarLabel: 'Actions',
          tabBarIcon: () => <MaterialIcons name="lightbulb" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name='MythsFeedStack'
        component={MythsFeedStack}
        options={{
          tabBarLabel: 'Myths',
          tabBarIcon: () => <Ionicons name="md-chatbox-ellipses-sharp" size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name='ConversationsStack'
        component={ConversationsStack}
        options={{
          tabBarLabel: 'Talk',
          tabBarIcon: () => <Entypo name="chat" size={24} color="black" />
        }}
      />
    </Tabs.Navigator>
  );
}

export default BottomNavigation;
