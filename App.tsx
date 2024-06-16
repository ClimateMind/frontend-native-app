import { useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { store } from 'src/store/store';
import NavigationRoot from 'src/navigation/NavigationRoot';
import { analyticsService } from 'src/services';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {
  const [canGoBack, setCanGoBack] = useState(false);

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<any>();

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
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef?.getCurrentRoute()?.name;

          setCanGoBack(navigationRef.canGoBack());
          analyticsService.setScreenName(routeNameRef.current);
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;

            setCanGoBack(navigationRef.canGoBack());
            analyticsService.setScreenName(currentRouteName ?? 'undefined');
          }
        }}
      >
        <NavigationRoot canGoBack={canGoBack} />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
