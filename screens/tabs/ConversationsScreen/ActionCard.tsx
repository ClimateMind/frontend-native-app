import { Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import ClimateEffect2 from "../../../types/ClimateEffect2";
import { capitalizeFirstLetter } from "../../../utils";

interface Props {
  climateEffect: ClimateEffect2;
  onLearnMore: (climateEffect: ClimateEffect2) => void;
}

function ActionCard({ climateEffect, onLearnMore }: Props) {   
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Text>
      <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />
      <Text style={styles.text}>{climateEffect.effectShortDescription}</Text>

      <View style={styles.chipsContainer}>
        {climateEffect.relatedPersonalValues.map(value => (
          <Text key={value} style={styles.chip}>{value}</Text>
        ))}
      </View>

      <Pressable onPress={() => onLearnMore(climateEffect)}>
        <Text style={styles.button}>LEARN MORE</Text>
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
