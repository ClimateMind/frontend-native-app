import { SafeAreaView, StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import NavigationRoot from './NavigationRoot';

import Colors from './assets/colors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {

  NavigationBar.setBackgroundColorAsync(Colors.themeDark);

  const [fontsLoaded] = useFonts({
    'nunito': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-extra-bold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'nunito-black': require('./assets/fonts/Nunito-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" backgroundColor={Colors.themeDark}/>
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
