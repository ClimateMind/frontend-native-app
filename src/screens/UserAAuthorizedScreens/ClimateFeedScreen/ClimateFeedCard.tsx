import { Image, Pressable, StyleSheet, View } from "react-native";
import { capitalize } from "lodash";

import ClimateEffect from "src/types/ClimateEffect";
import ActionCardHeader from "./ActionCardHeader";

import Headline3 from "src/components/TextStyles/Headline3";
import BodyText from "src/components/TextStyles/BodyText";
import ButtonText from "src/components/TextStyles/ButtonText";
import Card from "src/components/Cards/Card";
import { CmChip } from "src/components";

interface Props {
  climateEffect: ClimateEffect;
  onLearnMore: (climateEffect: ClimateEffect) => void;
}

function ClimateFeedCard({ climateEffect, onLearnMore }: Props) {
  return (
    <Card>

      <Headline3 style={styles.title}>{capitalize(climateEffect.effectTitle)}</Headline3>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}

      <BodyText style={styles.text}>{climateEffect.effectShortDescription}</BodyText>

      {climateEffect.relatedPersonalValues && (
        <View style={styles.chipsContainer}>
          {climateEffect.relatedPersonalValues.map((value) => (
            <CmChip key={value} label={value} />
          ))}
        </View>
      )}

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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

export default ClimateFeedCard;
