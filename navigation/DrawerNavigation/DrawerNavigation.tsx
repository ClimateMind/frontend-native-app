import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

import { useAppSelector } from '../../store/hooks';
import Colors from '../../assets/colors';

// Drawer Screens
import StackNavigation from '../StackNavigation';
import BottomTabsNavigation from '../BottomTabsNavigation';
import QuizScreen from '../../screens/drawer/QuizScreen/QuizScreen';
import SubmitSetOneScreen from '../../screens/drawer/SubmitSetOneScreen/SubmitSetOneScreen';
import SubmitSetTwoScreen from '../../screens/drawer/SubmitSetTwoScreen/SubmitSetTwoScreen';
import ConversationsScreen from '../../screens/tabs/ConversationsScreen/ConversationsScreen';

export type DrawerNavigationParams = {
  StackNavigation: undefined;
  BottomTabsNavigation: { screen: string };
  QuizScreen: { questionSet: 1 | 2 };
  SubmitSetOneScreen: undefined;
  SubmitSetTwoScreen: undefined;
  ConversationsScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigationParams>();

function DrawerNavigation() {  
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  
  return (
    <Drawer.Navigator
      initialRouteName='StackNavigation'
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
      {!isLoggedIn && <Drawer.Screen name='StackNavigation' component={StackNavigation} />}
      {isLoggedIn && <Drawer.Screen name='BottomTabsNavigation' component={BottomTabsNavigation} />}
      {isLoggedIn && <Drawer.Screen name='ConversationsScreen' component={ConversationsScreen} />}
      <Drawer.Screen name='QuizScreen' component={QuizScreen} />
      <Drawer.Screen name='SubmitSetOneScreen' component={SubmitSetOneScreen} />
      <Drawer.Screen name='SubmitSetTwoScreen' component={SubmitSetTwoScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
