import { Image, Pressable, StyleSheet } from "react-native";

import ClimateEffect from "../../../types/ClimateEffect";
import ActionCardHeader from "./ActionCardHeader";
import { capitalizeFirstLetter } from "../../../utils";

import Headline3 from "../../../components/TextStyles/Headline3";
import BodyText from "../../../components/TextStyles/BodyText";
import ButtonText from "../../../components/TextStyles/ButtonText";
import Card from "../../../components/Cards/Card";

interface Props {
  climateEffect: ClimateEffect;
  onLearnMore: (climateEffect: ClimateEffect) => void;
}

function ClimateFeedCard({ climateEffect, onLearnMore }: Props) {
  return (
    <Card>

      <Headline3 style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Headline3>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}

      <BodyText style={styles.text}>{climateEffect.effectShortDescription}</BodyText>

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <ButtonText style={styles.button}>LEARN MORE</ButtonText>
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
});

export default ClimateFeedCard;
