import { Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import ClimateEffect from "../../../types/ClimateEffect";
import ActionCardHeader from "./ActionCardHeader";
import { capitalizeFirstLetter } from "../../../utils";

interface Props {
  climateEffect: ClimateEffect;
  onLearnMore: (climateEffect: ClimateEffect) => void;
}

function ClimateFeedCard({ climateEffect, onLearnMore }: Props) {   
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Text>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}
      <Text style={styles.text}>{climateEffect.effectShortDescription}</Text>

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <Text style={styles.button}>LEARN MORE</Text>
      </Pressable>

      <ActionCardHeader effectSolution={climateEffect.effectSolutions[0]}/>
    </View>
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

export default ClimateFeedCard;
