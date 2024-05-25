import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface Props {
  currentStep: number;
  totalSteps: number;
}

function OnboardingProgressBar({ currentStep, totalSteps }: Props) {
  const [previousStep, setPreviousStep] = useState(0);

  const fillAnimation = useRef(new Animated.Value(0)).current;

  const fillAnimationLeftToRight = Animated.timing(fillAnimation, {
    toValue: 40,
    duration: 300,
    useNativeDriver: false,
  });

  const fillAnimationRightToLeft = Animated.timing(fillAnimation, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  useEffect(() => {
    if (currentStep > previousStep) {
      fillAnimation.setValue(0);
      fillAnimationLeftToRight.start(() => {
        setPreviousStep(currentStep);
      });
    } else {
      fillAnimation.setValue(40);
      fillAnimationRightToLeft.start(() => {
        setPreviousStep(currentStep);
      });
    }
  }, [currentStep]);

  return (
    <View style={styles.progressBar}>
      {[...Array(totalSteps).keys()].map((step) => (
        <View
          key={step}
          style={[
            styles.step,
            step !== totalSteps - 1 && styles.gap,
          ]}
        >
          <Animated.View style={{ flex: 1, width: fillAnimation, backgroundColor: currentStep === step ? '#07373B' : 'white' }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  step: {
    width: 40,
    height: 6,
    backgroundColor: '#fff',
    borderColor: '#07373B',
    borderWidth: 1,
    borderRadius: 3,
    overflow: 'hidden',
  },
  gap: {
    marginRight: 20,
  },
});

export default OnboardingProgressBar;
