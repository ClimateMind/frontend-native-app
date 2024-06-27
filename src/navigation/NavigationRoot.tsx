import { useEffect } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

// Redux
import { login, setSessionId } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

// Navigation
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import NavigationRootDrawer from './NavigationRootDrawer';

import UserAUnauthorizedStackNavigation from './UserAUnauthorizedStackNavigation';
import UserAAuthorizedTabsNavigation from './UserAAuthorizedTabsNavigation';
import QuizScreen from 'src/screens/SharedScreens/QuizScreen';
import SubmitSetOneScreen from 'src/screens/SharedScreens/SubmitSetOneScreen';
import SubmitSetTwoScreen from 'src/screens/SharedScreens/SubmitSetTwoScreen';
import DevScreen from 'src/screens/SharedScreens/DevScreen';

import Colors from 'src/assets/colors';
import useApiClient from 'src/hooks/useApiClient';
import { CmToast } from 'src/shared/components';
import { StatusBar } from 'expo-status-bar';

export type RootDrawerNavigationParams = {
  UserAUnauthorizedScreens: { screen: 'StartScreen' | 'LoginScreen' | 'PersonalValuesScreenNewUser' } | undefined;
  UserAAuthorizedScreens: { screen: 'PersonalValuesScreen' | 'ConversationsStack' };
  QuizScreen: { questionSet: 1 | 2 };
  SubmitSetOneScreen: undefined;
  SubmitSetTwoScreen: undefined;
  DevScreen: undefined;
};

const RootDrawer = createDrawerNavigator<RootDrawerNavigationParams>();

interface Props {
  canGoBack: boolean;
}

function NavigationRoot({ canGoBack }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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

      SplashScreen.hideAsync();
    }

    isUserLoggedIn();
  }, []);

  useEffect(() => {
    if (!sessionId) {
      {
        apiClient.postSession()
          .then(result => dispatch(setSessionId(result.sessionId)))
      }
    }
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: isLoggedIn ? Colors.themeDark : 'white' }}>
        <StatusBar backgroundColor={isLoggedIn ? Colors.themeDark : 'white'} style={isLoggedIn ? 'light' : 'dark'} />

        <RootDrawer.Navigator
          drawerContent={NavigationRootDrawer}
          screenOptions={({ navigation }) => ({
            drawerPosition: 'right',
            headerStyle: { backgroundColor: Colors.themeDark },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => {
              if (!canGoBack) return null;
              return <Ionicons name="chevron-back" size={24} color="white" onPress={navigation.goBack} style={{ padding: 10, paddingRight: 20 }} />
            },
            headerRight: () => <DrawerToggleButton tintColor='white' />,
            headerTitle: () => (
              <Pressable delayLongPress={5000} onLongPress={() => navigation.navigate('DevScreen')}>
                <Text style={{ fontFamily: 'nunito-bold', color: 'white', fontSize: 20 }}>Climate Mind</Text>
              </Pressable>
            ),
          })}
        >
          {!isLoggedIn && <RootDrawer.Screen name='UserAUnauthorizedScreens' component={UserAUnauthorizedStackNavigation} options={{ headerShown: false }} />}
          {isLoggedIn && <RootDrawer.Screen name='UserAAuthorizedScreens' component={UserAAuthorizedTabsNavigation} options={{ headerShown: true }} />}

          <RootDrawer.Screen name='QuizScreen' component={QuizScreen} options={{ headerShown: false }} />
          <RootDrawer.Screen name='SubmitSetOneScreen' component={SubmitSetOneScreen} options={{ headerShown: false }} />
          <RootDrawer.Screen name='SubmitSetTwoScreen' component={SubmitSetTwoScreen} options={{ headerShown: false }} />
          <RootDrawer.Screen name='DevScreen' component={DevScreen} options={{ headerShown: false }} />
        </RootDrawer.Navigator>

        <CmToast />
      </SafeAreaView>
    </>
  );
}

export default NavigationRoot;
