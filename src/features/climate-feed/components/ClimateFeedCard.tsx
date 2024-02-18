import { Image, Pressable, StyleSheet, View } from 'react-native';

import { capitalizeFirstLetter } from 'src/utils';
import ClimateEffect from 'src/types/ClimateEffect';
import ActionCardHeader from './ActionCardHeader';
import { CmTypography, CmChip, Card } from '@shared/components';


interface Props {
  climateEffect: ClimateEffect;
  onLearnMore: (climateEffect: ClimateEffect) => void;
}

function ClimateFeedCard({ climateEffect, onLearnMore }: Props) {

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
          {climateEffect.relatedPersonalValues.map((value) => ( 
                <CmChip key={value} label={value} />
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
    paddingVertical: 10,
  },
});




export default ClimateFeedCard;
