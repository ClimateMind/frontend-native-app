import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack screens
import StartScreen from '../screens/stack/StartScreen/StartScreen';
import LoginScreen from '../screens/stack/LoginScreen/LoginScreen';
import PreQuizScreen from '../screens/stack/PreQuizScreen/PreQuizScreen';
import QuizScreen from '../screens/stack/QuizScreen/QuizScreen';
import SubmitSetOneScreen from '../screens/stack/SubmitSetOneScreen/SubmitSetOneScreen';
import SubmitSetTwoScreen from '../screens/stack/SubmitSetTwoScreen/SubmitSetTwoScreen';
import PersonalValuesScreenNewUser from '../screens/stack/PersonalValuesScreenNewUser/PersonalValuesScreenNewUser';
import SignUpScreen from '../screens/stack/SignUpScreen/SignUpScreen';

export type RootStackParams = {
  StartScreen: undefined;
  LoginScreen: undefined;
  PreQuizScreen: undefined;
  QuizScreen: undefined;
  SubmitSetOneScreen: undefined;
  SubmitSetTwoScreen: undefined;
  PersonalValuesScreenNewUser: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

function RootStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName='StartScreen'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='StartScreen' component={StartScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='PreQuizScreen' component={PreQuizScreen} />
      <Stack.Screen name='QuizScreen' component={QuizScreen} />
      <Stack.Screen name='SubmitSetOneScreen' component={SubmitSetOneScreen} />
      <Stack.Screen name='SubmitSetTwoScreen' component={SubmitSetTwoScreen} />
      <Stack.Screen name='PersonalValuesScreenNewUser' component={PersonalValuesScreenNewUser} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
