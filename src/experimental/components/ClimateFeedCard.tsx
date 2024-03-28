import { useRef } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

import { capitalizeFirstLetter } from 'src/utils';
import ClimateEffect from 'src/types/ClimateEffect';
import { CmTypography, CmChip, CmTooltip, Card } from '@shared/components';
import { useCmTooltip } from '@shared/hooks';

interface Props {
  climateEffect: ClimateEffect;
}

function ClimateFeedCard({ climateEffect }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { activeTooltipIndex, toggleTooltip, handleCardPress } = useCmTooltip(fadeAnim);

  return (
    <Card onTouchStart={handleCardPress} style={{ width: '100%', height: 430 }}>
      <CmTypography variant="h4" style={styles.title}>
        {capitalizeFirstLetter(climateEffect.effectTitle)}
      </CmTypography>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{ uri: climateEffect.imageUrl }} />}

      <CmTypography variant="body" style={styles.text} numberOfLines={3} ellipsizeMode="tail">
        {climateEffect.effectShortDescription}
      </CmTypography>

      {climateEffect.relatedPersonalValues && (
        <View style={styles.chipsContainer}>
          {climateEffect.relatedPersonalValues.map((value, index) => (
            <View key={value} style={{ marginBottom: 10 }}>
              {activeTooltipIndex === index && <CmTooltip value={value} fadeAnim={fadeAnim} />}
              <Pressable onPress={() => toggleTooltip(index)}>
                <CmChip label={value} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    textAlign: 'left',
  },
  image: {
    height: 200,
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
  moreLessButton: {
    textAlign: 'left',
    paddingVertical: 8,
  },
});

export default ClimateFeedCard;
