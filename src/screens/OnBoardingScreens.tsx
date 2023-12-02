import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {Screen, Content, Section} from '@shared/components'
import { useAppDispatch } from 'src/store/hooks';
import { completeOnboarding } from 'src/features/onboarding/state/onboardingSlice';

const images = [
  require('src/features/onboarding/assets/onboarding1.png'),
  require('src/features/onboarding/assets/onboarding2.png'),
  require('src/features/onboarding/assets/onboarding3.png'),
  require('src/features/onboarding/assets/onboarding4.png'),
];

const headers = [
  'Explore Values', 'Learn Impacts', 'Find Solutions', 'Take Action',
];

const texts = [
  'Identify your personal values and how they relate to climate change impacts.',
  'Gain insights on the growing impacts of climate change.',
  'Discover climate solutions tailored to you.',
  'Start a guided conversation with a friend about climate change.',
];

function OnBoardingScreens() {
  const dispatch = useAppDispatch();
  const [currentScreen, setCurrentScreen] = useState(0);

  function nextScreen() {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    } else {
      dispatch(completeOnboarding());
    }
  }

  function previousScreen() {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  }

  return (
    <Screen>
      <Section>
        <Content>
          <View style={styles.contentArea}>
            <Image style={styles.image} source={images[currentScreen]} />
            <Text style={styles.headerText}>{headers[currentScreen]}</Text>
            <Text style={styles.text}>{texts[currentScreen]}</Text>
          </View>
          <View style={styles.navIcons}>
            <Pressable onPress={() => previousScreen()} style={styles.navIcon}>
              {currentScreen > 0 && <MaterialIcons name="arrow-back-ios" size={32} color="black" />}
            </Pressable>
            <Pressable onPress={() => nextScreen()} style={styles.navIcon}>
              <MaterialIcons name="arrow-forward-ios" size={32} color="black" />
            </Pressable>
          </View>
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    marginTop: '20%',
  },
  image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 2.7,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'nunito-bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  text: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
  },
  navIcons: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  navIcon: {
    padding: 20,
  },
});

export default OnBoardingScreens;
