
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Colors from './assets/colors';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './navigation/DrawerNavigation/DrawerNavigation';

function App() {  
  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <View style={styles.safeArea}></View>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
safeArea: {
    backgroundColor: Colors.startScreenBackgroundDark,
  },
});

export default App;
