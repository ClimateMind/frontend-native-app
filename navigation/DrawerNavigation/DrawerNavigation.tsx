import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

import Colors from '../../assets/colors';

// Drawer Screens
import RootStackNavigation from '../RootStackNavigation';
import BottomNavigation from '../BottomNavigation';
import PrivacyPolicyScreen from '../../screens/drawer/PrivacyPolicyScreen/PrivacyPolicyScreen';
import PersonalValuesScreen from '../../screens/drawer/PersonalValuesScreen/PersonalValuesScreen';
import { useAppSelector } from '../../store/hooks';

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
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerPosition: 'right',
        title: 'Climate Mind',
        headerStyle: { backgroundColor: Colors.startScreenBackgroundDark },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor='white' />,
      }}  
    >
      {!isLoggedIn && <Drawer.Screen name='RootStackNavigation' component={RootStackNavigation} />}
      {isLoggedIn && <Drawer.Screen name='BottomNavigation' component={BottomNavigation} />}
      <Drawer.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} />
      {isLoggedIn && <Drawer.Screen name='PersonalValuesScreen' component={PersonalValuesScreen} />}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
