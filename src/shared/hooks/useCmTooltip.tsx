import { useState } from 'react';
import { Animated } from 'react-native';

function useCmTooltip(fadeAnim: Animated.Value | Animated.ValueXY) {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  const fadeIn = (index: number) => {
    setActiveTooltipIndex(index);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setActiveTooltipIndex(null));
  };

  const toggleTooltip = (index: number) => {
    if (activeTooltipIndex === index) {
      fadeOut();
    } else {
      fadeIn(index);
    }
  };

  function handleCardPress() {
    // If no tooltip is active, then proceed to set the activeTooltipIndex to null
    if (activeTooltipIndex !== null) {
      fadeOut(); // This ensures tooltips are closed properly when clicking outside
    }
  }

  return {
    activeTooltipIndex,
    toggleTooltip,
    handleCardPress,
    fadeOut,
  };
}

export default useCmTooltip;
