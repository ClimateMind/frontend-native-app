import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StartScreen from './screens/stack/StartScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from './assets/colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.safeArea}></View>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Start'
          screenOptions={{
            title: 'Climate Mind',
            headerStyle: { backgroundColor: Colors.startScreenBackgroundDark },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name='Start' component={StartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    // height: 60,
    backgroundColor: Colors.startScreenBackgroundDark,
  },
});

export default App;
