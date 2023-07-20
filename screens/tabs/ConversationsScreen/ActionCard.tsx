import { Pressable, StyleSheet } from "react-native";
import { Image } from "react-native";

import { capitalizeFirstLetter } from "../../../utils";
import ClimateEffect2 from "../../../types/ClimateEffect2";
import RelatedPersonalValuesChips from "../../../components/RelatedPersonalValuesChips";
import Headline3 from "../../../components/TextStyles/Headline3";
import BodyText from "../../../components/TextStyles/BodyText";
import ButtonText from "../../../components/TextStyles/ButtonText";
import Card from "../../../components/Cards/Card";

interface Props {
  climateEffect: ClimateEffect2;
  onLearnMore: (climateEffect: ClimateEffect2) => void;
}

function ActionCard({ climateEffect, onLearnMore }: Props) {   
  return (
    <Card>

      <Headline3 style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Headline3>
      <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />
      <BodyText style={styles.text}>{climateEffect.effectShortDescription}</BodyText>

      <RelatedPersonalValuesChips relatedPersonalValues={climateEffect.relatedPersonalValues ?? []}/>

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <ButtonText style={styles.button}>LEARN MORE</ButtonText>
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
});

export default ActionCard;
