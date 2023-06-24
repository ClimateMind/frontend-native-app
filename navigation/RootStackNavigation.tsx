import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack screens
import StartScreen from '../screens/stack/StartScreen/StartScreen';
import LoginScreen from '../screens/stack/LoginScreen/LoginScreen';
import PreQuizScreen from '../screens/stack/PreQuizScreen/PreQuizScreen';
import PersonalValuesScreenNewUser from '../screens/stack/PersonalValuesScreenNewUser/PersonalValuesScreenNewUser';
import SignUpScreen from '../screens/stack/SignUpScreen/SignUpScreen';
import OnBoardingScreen from '../screens/stack/OnBoardingScreen/OnBoardingScreen';

export type RootStackParams = {
  StartScreen: undefined;
  LoginScreen: undefined;
  PreQuizScreen: undefined;
  PersonalValuesScreenNewUser: undefined;
  SignUpScreen: undefined;
  OnBoardingScreen:undefined
};

const Stack = createNativeStackNavigator<RootStackParams>();

function RootStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName='OnBoardingScreen'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='StartScreen' component={StartScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='PreQuizScreen' component={PreQuizScreen} />
      <Stack.Screen name='PersonalValuesScreenNewUser' component={PersonalValuesScreenNewUser} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
