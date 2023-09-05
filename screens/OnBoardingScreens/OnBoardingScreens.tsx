import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Screen from '../../components/Screen/Screen';
import Content from '../../components/Screen/Content';
import Section from '../../components/Screen/Section';

const images = [
  require('../../assets/onboarding/onboarding1.png'),
  require('../../assets/onboarding/onboarding2.png'),
  require('../../assets/onboarding/onboarding3.png'),
  require('../../assets/onboarding/onboarding4.png'),
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

interface Props {
  onCompleted: () => void;
}

function OnBoardingScreens({ onCompleted }: Props) {
  const [currentScreen, setCurrentScreen] = useState(0);

  function nextScreen() {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onCompleted();
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
