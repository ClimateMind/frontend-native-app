import { SafeAreaView, StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { NavigationContainer } from '@react-navigation/native';
import NavigationRoot from './NavigationRoot';

import Colors from './assets/colors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />
          <NavigationContainer>
            <NavigationRoot />
          </NavigationContainer>
        </SafeAreaView>
      </RootSiblingParent>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.themeDark,
  },
});

export default App;
