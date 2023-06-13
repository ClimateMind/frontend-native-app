import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';

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

  const [isTryingToLogin, setIsTryingToLogin] = useState(true);

  useEffect(() => {
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

      setIsTryingToLogin(false);
      await SplashScreen.hideAsync();
    }

    isUserLoggedIn();
  }, []);

  useEffect(() => {
    async function getSessionId() {
      const sessionId = await AsyncStorage.getItem('sessionId');
      if (sessionId) {
        dispatch(setSessionId(sessionId));
      } else {
        apiClient.postSession()
          .then(result => dispatch(setSessionId(result.sessionId)))
      }
    }

    getSessionId();
  }, [])

  if (isTryingToLogin) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.safeArea}></View>
      <NavigationContainer>
        
        <DrawerNavigation />
      </NavigationContainer>
    </>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <RootSiblingParent>
      <SafeAreaView style={styles.container}>
        <Root />
        </SafeAreaView>
      </RootSiblingParent>
    </Provider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.themeDark,
  },
  container:{
    flex:1
  }
});

export default App;
