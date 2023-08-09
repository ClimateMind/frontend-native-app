import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

// Redux
import { login, setSessionId } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

// Navigation
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import NavigationRootDrawer from './NavigationRootDrawer';
import OnBoardingScreens from '../screens/OnBoardingScreens/OnBoardingScreens';
import UserAUnauthorizedStackNavigation from './UserAUnauthorizedStackNavigation';
import UserAAuthorizedTabsNavigation from './UserAAuthorizedTabsNavigation';
import QuizScreen from '../screens/SharedScreens/QuizScreen/QuizScreen';
import SubmitSetOneScreen from '../screens/SharedScreens/SubmitSetOneScreen/SubmitSetOneScreen';
import SubmitSetTwoScreen from '../screens/SharedScreens/SubmitSetTwoScreen/SubmitSetTwoScreen';

import Colors from '../assets/colors';
import useApiClient from '../hooks/useApiClient';

export type RootDrawerNavigationParams = {
  UnauthorizedUserAScreens: undefined;
  AuthorizedUserAScreens: { screen: 'PersonalValuesScreen' };
  QuizScreen: { questionSet: 1 | 2 };
  SubmitSetOneScreen: undefined;
  SubmitSetTwoScreen: undefined;
};

const RootDrawer = createDrawerNavigator<RootDrawerNavigationParams>();

function NavigationRoot() {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector(state => state.auth.sessionId);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function firstTimeUsage() {
      const firstTimeUsage = await AsyncStorage.getItem('firstTimeUsage');
      if (firstTimeUsage === null) {
        await AsyncStorage.setItem('firstTimeUsage', 'false');
        return true;
      }

      return false;
    }

    async function isUserLoggedIn() {
      // Check if the user information is stored on the device
      const accessToken = await AsyncStorage.getItem('accessToken');
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const email = await AsyncStorage.getItem('email');
      const userId = await AsyncStorage.getItem('userId');
      const quizId = await AsyncStorage.getItem('quizId');

      if (accessToken && firstName && lastName && email && userId && quizId) {
        // If so, login the user directly when he opens the app
        dispatch(login({
          accessToken, firstName, lastName,
          email, userId, quizId,
        }));
      }
    }

    firstTimeUsage().then((result) => {
      if (result) {
        // If it's the first time the user opens the app, show the onboading screens
        setShowOnboarding(true);
        SplashScreen.hideAsync();
      } else {
        // Otherwise, check if the user is logged in
        isUserLoggedIn().then(() => SplashScreen.hideAsync());
      }
    });
  }, []);

  useEffect(() => {
    if (!sessionId) {{
        apiClient.postSession()
          .then(result => dispatch(setSessionId(result.sessionId)))
      }
    }
  }, []);

  if (showOnboarding) {
    return <OnBoardingScreens onCompleted={() => setShowOnboarding(false)} />;
  }
  
  return (
    <RootDrawer.Navigator
      drawerContent={NavigationRootDrawer}
      screenOptions={{
        drawerPosition: 'right',
        title: 'Climate Mind',
        headerTitleStyle: { fontFamily: 'nunito-bold' },
        headerStyle: { backgroundColor: Colors.themeDark },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor='white' />,
      }}
    >
      {!isLoggedIn && <RootDrawer.Screen name='UnauthorizedUserAScreens' component={UserAUnauthorizedStackNavigation} />}
      {isLoggedIn && <RootDrawer.Screen name='AuthorizedUserAScreens' component={UserAAuthorizedTabsNavigation} />}

      <RootDrawer.Screen name='QuizScreen' component={QuizScreen} />
      <RootDrawer.Screen name='SubmitSetOneScreen' component={SubmitSetOneScreen} />
      <RootDrawer.Screen name='SubmitSetTwoScreen' component={SubmitSetTwoScreen} />
    </RootDrawer.Navigator>
  );
}

export default NavigationRoot;
