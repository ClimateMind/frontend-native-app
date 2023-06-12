import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import useApiClient from './hooks/useApiClient';
import Colors from './assets/colors';

// Fonts
import { useFonts } from 'expo-font';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';
import { login, setSessionId } from './store/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './navigation/DrawerNavigation/DrawerNavigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function Root() {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector(state => state.auth.sessionId);
  
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
        }))
      }
    }

    firstTimeUsage()
      .then(result => {
        if (result) {
          // If it's the first time the user opens the app, show the onboading screens
          setShowOnboarding(true);
          SplashScreen.hideAsync();
        } else {
          // Otherwise, check if the user is logged in
          isUserLoggedIn().then(() => SplashScreen.hideAsync());
        }
      })
  }, [])
  
  useEffect(() => {
    if (sessionId === '') {{
        apiClient.postSession()
          .then(result => dispatch(setSessionId(result.sessionId)))
      }
    }
  })
     
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.safeArea}></View>
      <NavigationContainer>
        {showOnboarding && <View style={{ flex: 1, backgroundColor: 'red'}}><Text>This is an Onboarding Screen</Text></View>}
        {!showOnboarding && <DrawerNavigation />}
      </NavigationContainer>
    </>
  );
}

function App() {  
  const [fontsLoaded] = useFonts({
    'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Root />
      </RootSiblingParent>
    </Provider>
  );
}

const styles = StyleSheet.create({
safeArea: {
    backgroundColor: Colors.themeDark,
  },
});

export default App;
