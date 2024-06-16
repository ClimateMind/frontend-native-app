import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack screens
import StartScreen from 'src/screens/UserAUnauthorizedScreens/StartScreen';
import LoginScreen from 'src/screens/UserAUnauthorizedScreens/LoginScreen';
import PreOnboardingScreen from 'src/screens/UserAUnauthorizedScreens/PreOnboardingScreen';
import OnboardingScreen from 'src/screens/UserAUnauthorizedScreens/OnboardingScreen';
import PersonalValuesScreenNewUser from 'src/screens/UserAUnauthorizedScreens/PersonalValuesScreenNewUser';
import SignUpScreen from 'src/screens/UserAUnauthorizedScreens/SignUpScreen';

export type StackParams = {
  StartScreen: undefined;
  LoginScreen: undefined;
  PreOnboardingScreen: undefined;
  OnboardingScreen: undefined;
  PreQuizScreen: undefined;
  PersonalValuesScreenNewUser: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

function UserAUnauthorizedStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PreOnboardingScreen" component={PreOnboardingScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="PersonalValuesScreenNewUser" component={PersonalValuesScreenNewUser} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default UserAUnauthorizedStackNavigation;
