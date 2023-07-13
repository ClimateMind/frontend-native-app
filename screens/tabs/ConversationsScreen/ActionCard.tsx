import { Pressable, StyleSheet } from "react-native";
import { Image, View } from "react-native";

import { capitalizeFirstLetter } from "../../../utils";
import ClimateEffect2 from "../../../types/ClimateEffect2";
import RelatedPersonalValuesChips from "../../../components/RelatedPersonalValuesChips";
import BodyText from "../../../components/TextStyles/BodyText";
import CaptionText from "../../../components/TextStyles/CaptionText";
import ButtonText from "../../../components/TextStyles/ButtonText";

interface Props {
  climateEffect: ClimateEffect2;
  onLearnMore: (climateEffect: ClimateEffect2) => void;
}

function ActionCard({ climateEffect, onLearnMore }: Props) {   
  return (
    <View style={styles.card}>
      <BodyText style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</BodyText>
      <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />
      <CaptionText style={styles.text}>{climateEffect.effectShortDescription}</CaptionText>

      <View style={styles.chipsContainer}>
        {climateEffect.relatedPersonalValues.map(value => (
          <CaptionText key={value} style={styles.chip}>{value}</CaptionText>
        ))}
      </View>

      <RelatedPersonalValuesChips relatedPersonalValues={climateEffect.relatedPersonalValues ?? []}/>

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <ButtonText style={styles.button}>LEARN MORE</ButtonText>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    padding: 15,
    paddingVertical: 20,
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
    padding: 10,
    letterSpacing: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  chip: {
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
});

export default ActionCard;
