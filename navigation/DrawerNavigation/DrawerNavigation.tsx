import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

import { useAppSelector } from '../../store/hooks';
import Colors from '../../assets/colors';

// Drawer Screens
import RootStackNavigation from '../RootStackNavigation';
import BottomNavigation from '../BottomNavigation';
import PersonalValuesScreen from '../../screens/drawer/PersonalValuesScreen';
import QuizScreen from '../../screens/stack/QuizScreen/QuizScreen';
import ConversationsScreen from '../../screens/tabs/ConversationsScreen/ConversationsScreen';

export type DrawerNavigationParams = {
  RootStackNavigation: undefined;
  BottomNavigation: undefined;
  PersonalValuesScreen: undefined;
  QuizScreen: { questionSet: 1 | 2 };
  ConversationsScreen: undefined;
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
        headerStyle: { backgroundColor: Colors.themeDark },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor='white' />,
      }}  
    >
      {!isLoggedIn && <Drawer.Screen name='RootStackNavigation' component={RootStackNavigation} />}
      {isLoggedIn && <Drawer.Screen name='BottomNavigation' component={BottomNavigation} />}
      {isLoggedIn && <Drawer.Screen name='PersonalValuesScreen' component={PersonalValuesScreen} />}
      {isLoggedIn && <Drawer.Screen name='QuizScreen' component={QuizScreen} />}
      {isLoggedIn && <Drawer.Screen name='ConversationsScreen' component={ConversationsScreen} />}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
