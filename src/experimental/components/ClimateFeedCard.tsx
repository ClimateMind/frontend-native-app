import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

import { capitalizeFirstLetter } from 'src/utils';
import ClimateEffect from 'src/types/ClimateEffect';
import { CmTypography, CmChip, CmTooltip, Card } from '@shared/components';
import { useCmTooltip } from '@shared/hooks';
// import ActionCardHeader from './ActionCardHeader';

interface Props {
  climateEffect: ClimateEffect;
  onLearnMore: (climateEffect: ClimateEffect) => void;
}

function ClimateFeedCard({ climateEffect, onLearnMore }: Props) {
  const [expanded, setExpanded] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = Dimensions.get('window');
  const { activeTooltipIndex, toggleTooltip, handleCardPress } = useCmTooltip(fadeAnim);
  console.log(climateEffect.imageUrl);
  return (
    <Card onTouchStart={handleCardPress} style={{ height: 426 }}>
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
            <View key={value} style={{ marginRight: 10, marginBottom: 10 }}>
              {activeTooltipIndex === index && <CmTooltip value={value} fadeAnim={fadeAnim} />}
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

      {/* <Pressable onPress={() => setExpanded((prev) => !prev)} style={{ marginTop: 20 }}>
        {!expanded && (
          <CmTypography variant="button" style={styles.moreLessButton}>
            MORE
          </CmTypography>
        )}
        {expanded && (
          <CmTypography variant="button" style={styles.moreLessButton}>
            LESS
          </CmTypography>
        )} */}
      {/* </Pressable> */}
      {/* <ActionCardHeader effectSolution={climateEffect.effectSolutions[0]} /> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    textAlign: 'left',
  },
  image: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
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
