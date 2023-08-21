import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Stack screens
import StartScreen from '../screens/UserAUnauthorizedScreens/StartScreen/StartScreen';
import LoginScreen from '../screens/UserAUnauthorizedScreens/LoginScreen/LoginScreen';
import PreQuizScreen from '../screens/UserAUnauthorizedScreens/PreQuizScreen/PreQuizScreen';
import PersonalValuesScreenNewUser from '../screens/UserAUnauthorizedScreens/PersonalValuesScreenNewUser/PersonalValuesScreenNewUser';
import SignUpScreen from '../screens/UserAUnauthorizedScreens/SignUpScreen/SignUpScreen';

export type StackParams = {
  StartScreen: undefined;
  LoginScreen: undefined;
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
      <Stack.Screen name="PreQuizScreen" component={PreQuizScreen} />
      <Stack.Screen name="PersonalValuesScreenNewUser" component={PersonalValuesScreenNewUser} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default UserAUnauthorizedStackNavigation;
