import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../assets/colors';

// Drawer Screens
import RootStackNavigation from './RootStackNavigation';
import BottomNavigation from './BottomNavigation';
import PrivacyPolicyScreen from '../screens/drawer/PrivacyPolicyScreen';
import PersonalValuesScreen from '../screens/drawer/PersonalValuesScreen';
import { useAppSelector } from '../store/hooks';

export type DrawerNavigationParams = {
  RootStackNavigation: undefined;
  BottomNavigation: undefined;
  PrivacyPolicyScreen: undefined;
  PersonalValuesScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigationParams>();

function DrawerNavigation() {  
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  
  return (
    <Drawer.Navigator
      initialRouteName='RootStackNavigation'
      screenOptions={{
        title: 'Climate Mind',
        headerStyle: { backgroundColor: Colors.startScreenBackgroundDark },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        drawerPosition: 'right',
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor='white' />,
      }}
    >
      {!isLoggedIn && <Drawer.Screen name='RootStackNavigation' component={RootStackNavigation} options={{ drawerItemStyle: { height: 0 } }} />}
      {isLoggedIn && <Drawer.Screen name='BottomNavigation' component={BottomNavigation} options={{ drawerItemStyle: { height: 0 } }} />}
      <Drawer.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} options={{ drawerLabel: 'Privacy Policy' }} />
      {isLoggedIn && <Drawer.Screen name='PersonalValuesScreen' component={PersonalValuesScreen} options={{ drawerLabel: 'Personal Values' }} />}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
