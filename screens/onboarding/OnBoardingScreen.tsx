import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const texts = [
  'Explore how climate change impacts you personally and relates to your values.',
  'Stay informed on climate trends and developments to better understand the impacts of climate change.',
  'Discover climate solutions tailored to you.',
  'Start a conversation with a friend about climate change.',
]

const images = [
  require('../../assets/onboarding/onboarding1.png'),
  require('../../assets/onboarding/onboarding2.png'),
  require('../../assets/onboarding/onboarding3.png'),
  require('../../assets/onboarding/onboarding4.png'),
]

interface Props {
  onCompleted: () => void;
}

function OnBoardingScreen({ onCompleted }: Props) {
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
    <View style={styles.container}>

      <View style={styles.contentArea}>
        <Image style={styles.image} source={images[currentScreen]} />
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0EEEB',
  },
  contentArea: {
    flex: 1,
    marginTop: '20%',
  },
  image: {
    resizeMode: 'contain',
    width: '95%',
    height: Dimensions.get('window').height / 2,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    paddingHorizontal: 40,
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

export default OnBoardingScreen;
