import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'src/services';
import { capitalizeFirstLetter } from 'src/utils';
import ClimateEffect2 from 'src/types/ClimateEffect2';
import { CmTypography, CmChip, Card } from '@shared/components';

interface Props {
  climateEffect: ClimateEffect2;
  onLearnMore: (climateEffect: ClimateEffect2) => void;
}

function ActionCard({ climateEffect, onLearnMore }: Props) {
  // Track analytics events for card open and close
  useEffect(() => {
    analyticsService.postEvent(CardOpenEvent, climateEffect.effectId);

    return () => {
      analyticsService.postEvent(CardCloseEvent, climateEffect.effectId);
    }
  }, []);

  return (
    <Card>

      <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</CmTypography>
      <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />
      <CmTypography variant='body' style={styles.text}>{climateEffect.effectShortDescription}</CmTypography>

      {climateEffect.relatedPersonalValues && (
        <View style={styles.chipsContainer}>
          {climateEffect.relatedPersonalValues.map((value) => (
            <CmChip key={value} label={value} />
          ))}
        </View>
      )}

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <CmTypography variant='button' style={styles.button}>LEARN MORE</CmTypography>
      </Pressable>

    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 15,
    paddingVertical: 20,
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
    fontWeight: 'bold',
    padding: 20,
    letterSpacing: 1,
    textAlign: 'left',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

export default ActionCard;
