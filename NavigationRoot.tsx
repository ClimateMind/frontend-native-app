import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

// Redux
import { login, setSessionId } from './store/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

// Navigation
import DrawerNavigation from './navigation/DrawerNavigation/DrawerNavigation';
import OnBoardingScreens from './screens/onboarding/OnBoardingScreens';

import useApiClient from './hooks/useApiClient';

function NavigationRoot() {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector((state) => state.auth.sessionId);

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
        dispatch(
          login({
            accessToken,
            firstName,
            lastName,
            email,
            userId,
            quizId,
          })
        );
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
    if (!sessionId) {
      {
        apiClient
          .postSession()
          .then((result) => dispatch(setSessionId(result.sessionId)));
      }
    }
  }, []);

  return (
    <>
      {showOnboarding && (
        <OnBoardingScreens onCompleted={() => setShowOnboarding(false)} />
      )}
      {!showOnboarding && <DrawerNavigation />}
    </>
  );
}

export default NavigationRoot;
