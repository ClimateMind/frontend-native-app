import { Image, Pressable, Text, StyleSheet, View } from "react-native";

import ClimateEffect2 from "../../../types/ClimateEffect2";
import { capitalizeFirstLetter } from "../../../utils";
import RelatedPersonalValuesChips from "../../../components/RelatedPersonalValuesChips";
import Card_Shadow from "../../../shadow-presets/Card_Shadow";

interface Props {
  climateEffect: ClimateEffect2;
  onLearnMore: (climateEffect: ClimateEffect2) => void;
}

function ActionCard({ climateEffect, onLearnMore }: Props) {   
  return (
    <Card_Shadow>
    <View style={styles.card}>
      <Text style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Text>
      <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />
      <Text style={styles.text}>{climateEffect.effectShortDescription}</Text>

      <RelatedPersonalValuesChips relatedPersonalValues={climateEffect.relatedPersonalValues ?? []}/>

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <Text style={styles.button}>LEARN MORE</Text>
      </Pressable>

    </View>
    </Card_Shadow>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  text: {
    fontWeight: 'bold',
    padding: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    padding: 10,
    letterSpacing: 1,
  },
});

export default ActionCard;
