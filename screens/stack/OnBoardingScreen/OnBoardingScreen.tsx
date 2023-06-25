import {Pressable, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParams, 'OnBoardingScreen'>;

function OnBoardingScreen({ navigation }: Props) {

  const [index, setindex] = useState(0);

  function navigateToStartScreen() {
    navigation.navigate('StartScreen');
  }

  const screens = [
    {
      text: 'Explore how climate change impacts you personally and relates to your values.',
      uri: require('../../../assets/onboarding/onboarding1.png'),
      id: 1,
    },
    {
      text: 'Stay informed on climate trends and developments to better understand the impacts of climate change.',
      uri: require('../../../assets/onboarding/onboarding2.png'),
      id: 2,
    },
    {
      text: 'Discover climate solutions tailored to you.',
      uri: require('../../../assets/onboarding/onboarding3.png'),
      id: 3,
    },
    {
      text: 'Start a conversation with a friend about climate change.',
      uri: require('../../../assets/onboarding/onboarding4.png'),
      id: 4,
    },
  ];

  function nextScreen() {
   index >= 3 ? navigateToStartScreen() : setindex(index + 1);
  }

  function previousScreen() {
    index < 1 ? setindex(0) : setindex(index - 1);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.images} source={screens[index].uri} />
      <Text style={styles.text}>{screens[index].text}</Text>
      <View style={styles.navIcons}>
        <Pressable onPress={() => previousScreen()}>
          {index !== 0 && (
            <MaterialIcons name="arrow-back-ios" size={32} color="black" />
          )}
        </Pressable>
        <Pressable onPress={() => nextScreen()}>
          <MaterialIcons name="arrow-forward-ios" size={32} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D0EEEB',
  },
  images: {
    marginTop:40,
    resizeMode: 'contain',
    width: '100%',
    height: '45%',
    

  },
  text: {
    flex: 2,
    alignItems:'flex-start',
    paddingLeft: 45,
    paddingRight: 45,
    textAlign: 'left',
    fontFamily: 'nunito-bold',
    fontSize: 16,  
  },
  navIcons: {
    flex:3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-end',
    height:'50%',
    width: '100%',
  },
});

export default OnBoardingScreen;
