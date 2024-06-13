import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

export function usePreOnboardingAnimations(itemCount: number) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(Dimensions.get('window').height * 0.3)).current;

  const itemAnims = Array.from({ length: itemCount }, () => ({
    fadeAnim: useRef(new Animated.Value(0)).current,
    translateYAnim: useRef(new Animated.Value(30)).current,
  }));

  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      itemAnims.forEach((anim, index) => {
        Animated.sequence([
          Animated.timing(anim.fadeAnim, {
            toValue: 1,
            duration: 1000,
            delay: index * 1500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateYAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (index === itemAnims.length - 1) {
            Animated.timing(buttonFadeAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start();
          }
        });
      });
    });
  }, [fadeAnim, translateYAnim, itemAnims, buttonFadeAnim]);

  return { fadeAnim, translateYAnim, itemAnims, buttonFadeAnim };
}
