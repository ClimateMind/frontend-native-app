import { StyleSheet, View, Pressable, Animated } from 'react-native';

import { CmTypography } from '@shared/components';
import React, { useRef, useState } from 'react';

interface Props {
  label: string;
  backgroundColor: string;
  textColor: string;
}

const personalValueText: { [x: string]: string } = {
  benevolence: 'To value: Forgiving, helping, and being loyal, preserving and improving the lives of people that share core interests or identities.',
  hedonism: 'To value: Joy, pleasure, and satisfaction, enjoying oneself.',
  security: 'To value: A feeling of safety, stability, and order in society, at work, in home, and in relationships.',
  tradition: 'To value: Protecting the traditions of family, community, and/or culture.',
  universalism: 'To value: Caring for the well-being of all people and life, likely also diversity and protecting the environment.',
  'self-direction': 'To value: Freedom of thought and action, preferring to come to conclusions or decisions independently, satisfaction when creating or exploring the world.',
  conformity: 'To value: Sticking by the rules and conforming to social norms.',
  stimulation: 'To value: Excitement, challenge, and change.',
  achievement: 'To value: Success, meeting standards of excellence.',
  power: 'To value: Embracing power, holding dominance, social status and prestige.',
};

function CmToolTip({ label, backgroundColor, textColor }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    setShowTooltip(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowTooltip(false));
  };

  return (
    <View style={{ position: 'relative' }}>
      {showTooltip && (
        <Animated.View style={[styles.tooltip, { opacity: fadeAnim, backgroundColor: backgroundColor, borderWidth: backgroundColor.startsWith('#f') ? 1 : 0, borderColor: backgroundColor.startsWith('#f') ? '#d3d3d3' : 'none' }]}>
          <CmTypography variant="h2" style={[styles.tooltipText, { fontSize: 14, color: textColor }]}>
            {label[0].toUpperCase() + label.slice(1)}
          </CmTypography>
          <CmTypography variant={'body'} style={[styles.tooltipText, { fontSize: 14, color: textColor }]}>
            {personalValueText[label]}
          </CmTypography>
          <View style={[styles.caretDown, { borderTopColor: backgroundColor }]}></View>
        </Animated.View>
      )}
      <Pressable onPressIn={fadeIn} onPressOut={fadeOut}>
        <CmTypography variant="body" style={[styles.chip, { zIndex: 999 }]}>
          {label}
        </CmTypography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(51, 51, 51, 1)',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(8, 55, 59)',
    bottom: '100%',
    left: '45%',
    transform: [{ translateX: -50 }],
    minWidth: 120,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    zIndex: 999,
    marginBottom: 15,
  },
  tooltipText: {
    textAlign: 'left',
    color: 'white',
  },
  caretDown: {
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'rgba(51, 51, 51, 1)',
    position: 'absolute',
    bottom: -10,
    left: '45%',
  },
});

export default CmToolTip;
