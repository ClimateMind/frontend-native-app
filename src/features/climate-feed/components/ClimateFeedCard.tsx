import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { capitalizeFirstLetter } from 'src/utils';
import ClimateEffect from 'src/types/ClimateEffect';
import ActionCardHeader from './ActionCardHeader';
import { CmTypography, CmChip, Card } from '@shared/components';
import { useRef, useState } from 'react';

interface Props {
  climateEffect: ClimateEffect;
  onLearnMore: (climateEffect: ClimateEffect) => void;
}

const personalValueText: { [x: string]: string } = {
  benevolence: 'To value: Forgiving, helping, and being loyal; preserving and improving the lives of people that share core interests or identities.',
  hedonism: 'To value: Joy, pleasure, and satisfaction; enjoying oneself.',
  security: 'To value: A feeling of safety, stability, and order in society, at work, in home, and in relationships.',
  tradition: 'To value: Protecting the traditions of family, community, and/or culture.',
  universalism: 'To value: Caring for the well-being of all people and life; likely also diversity and protecting the environment.',
  'self-direction': 'To value: Freedom of thought and action, preferring to come to decisions independently; satisfaction when creating or exploring the world.',
  conformity: 'To value: Sticking by the rules and conforming to social norms.',
  stimulation: 'To value: Excitement, challenge, and change.',
  achievement: 'To value: Success; meeting standards of excellence.',
  power: 'To value: Embracing power, holding dominance; social status and prestige.',
};

function ClimateFeedCard({ climateEffect, onLearnMore }: Props) {
  
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    }).start(() =>  setActiveTooltipIndex(null));
  };

  const toggleTooltip = (index: number) => {
    if (activeTooltipIndex === index) {
    fadeOut()
    } else {
     fadeIn(index)
    }
  };

  return (
    <Card>
      <CmTypography variant="h3" style={styles.title}>
        {capitalizeFirstLetter(climateEffect.effectTitle)}
      </CmTypography>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{ uri: climateEffect.imageUrl }} />}

      <CmTypography variant="body" style={styles.text}>
        {climateEffect.effectShortDescription}
      </CmTypography>

      {climateEffect.relatedPersonalValues && (
        <View style={styles.chipsContainer}>
          {climateEffect.relatedPersonalValues.map((value, index) => (
            <View key={value} style={{ marginRight: 10, marginBottom: 10 }}>
              {activeTooltipIndex === index && (
                   <Animated.View style={[styles.tooltip, { opacity: fadeAnim }]}>
                   <CmTypography variant="h2" style={[styles.tooltipText, { fontSize: 14 }]}>
                     {value[0].toUpperCase() + value.slice(1)}
                   </CmTypography>
                   <CmTypography variant={'body'} style={[styles.tooltipText, { fontSize: 14 }]}>
                     {personalValueText[value]}
                   </CmTypography>
                   <View style={styles.caretDown}></View>
                 </Animated.View>
              )}
              <Pressable onPress={() => toggleTooltip(index)}>
                <CmChip label={value} />
              </Pressable>
            </View>
          ))}
        </View>
      )}

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <CmTypography variant="button" style={styles.button}>
          LEARN MORE
        </CmTypography>
      </Pressable>

      <ActionCardHeader effectSolution={climateEffect.effectSolutions[0]} />
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 250,
  },
  text: {
    letterSpacing: 1,
    lineHeight: 20,
    padding: 20,
  },
  button: {
    marginBottom: 10,
    paddingLeft: 20,
    paddingVertical: 20,
    textAlign: 'left',
    fontSize: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 15,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderBottomWidth: 0,
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
    color: 'black',
  },
  caretDown: {
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'white',
    position: 'absolute',
    bottom: -9,
    left: '45%',
    zIndex: 1000,
  },
});

export default ClimateFeedCard;
