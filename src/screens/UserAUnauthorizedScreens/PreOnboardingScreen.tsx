import React from 'react';
import { Animated, StyleSheet, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';
import { Screen, CmTypography } from 'src/shared/components';
import { OnboardingButton, PreOnboardingItem, usePreOnboardingAnimations } from 'src/features/onboarding';

const items = [
  { text: 'You might think you lack the expertise', image: require('src/features/onboarding/assets/pre-onboarding-item1.png'), reverseOrder: false },
  { text: 'Or feel like no one cares or listens', image: require('src/features/onboarding/assets/pre-onboarding-item2.png'), reverseOrder: true },
  { text: 'Or that you’ll hurt your loved one’s feelings if you bring it up....', image: require('src/features/onboarding/assets/pre-onboarding-item3.png'), reverseOrder: false },
];

type Props = NativeStackScreenProps<StackParams, 'PreOnboardingScreen'>;

function PreOnboardingScreen({ navigation }: Props) {
  const { fadeAnim, translateYAnim, itemAnims, buttonFadeAnim } = usePreOnboardingAnimations(items.length);

  function handleContinuePress() {
    navigation.navigate('OnboardingScreen');
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.animatedContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }],
                maxWidth: 270,
                marginBottom: 20,
              },
            ]}
          >
            <CmTypography variant='h3'>
              Talking about climate change can be difficult
            </CmTypography>
          </Animated.View>
          {items.map((item, index) => (
            <Animated.View
              key={index}
              style={[
                styles.animatedItem,
                {
                  opacity: itemAnims[index].fadeAnim,
                  transform: [{ translateY: itemAnims[index].translateYAnim }],
                  marginTop: index === 0 ? 40 : 10,
                },
              ]}
            >
              <PreOnboardingItem text={item.text} image={item.image} reverseOrder={item.reverseOrder} />
            </Animated.View>
          ))}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: buttonFadeAnim,
                marginTop: 40,
                maxWidth: 305,
              },
            ]}
          >
            <OnboardingButton text='Continue' onPress={handleContinuePress} />
          </Animated.View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  animatedContainer: {
    alignItems: 'center',
  },
  animatedItem: {
    width: '100%',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});

export default PreOnboardingScreen;
