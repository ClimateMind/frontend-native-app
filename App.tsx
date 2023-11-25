import { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import Colors from 'src/assets/colors';
import { store } from 'src/store/store';
import NavigationRoot from 'src/navigation/NavigationRoot';
import { analyticsService } from 'src/services';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<any>();

  NavigationBar.setBackgroundColorAsync(Colors.themeDark);

  const [fontsLoaded] = useFonts({
    'nunito': require('src/assets/fonts/Nunito-Regular.ttf'),
    'nunito-italic': require('src/assets/fonts/Nunito-Italic.ttf'),
    'nunito-bold': require('src/assets/fonts/Nunito-Bold.ttf'),
    'nunito-extra-bold': require('src/assets/fonts/Nunito-ExtraBold.ttf'),
    'nunito-black': require('src/assets/fonts/Nunito-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" backgroundColor={Colors.themeDark} />
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
              analyticsService.setScreenName(routeNameRef.current);
            }}
            onStateChange={() => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef?.getCurrentRoute()?.name;

              if (previousRouteName !== currentRouteName) {
                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;

                // Replace the line below to add the tracker from a mobile analytics SDK
                analyticsService.setScreenName(currentRouteName ?? 'undefined');
              }
            }}
          >
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
