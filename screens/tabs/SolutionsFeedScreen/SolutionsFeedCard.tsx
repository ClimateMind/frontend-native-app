import { Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";

import { capitalizeFirstLetter } from "../../../utils";
import Solution from "../../../types/Solution";

interface Props {
  solution: Solution;
  onLearnMore: (solution: Solution) => void;
}

function SolutionsFeedCard({ solution, onLearnMore }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.actionType}>{solution.solutionType.toUpperCase()} ACTION</Text>
      <Text style={styles.title}>{capitalizeFirstLetter(solution.solutionTitle)}</Text>
      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}
      <Text style={styles.text}>{solution.shortDescription}</Text>

      <Pressable onPress={() => onLearnMore(solution)}>
        <Text style={styles.button}>MORE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  actionType: {
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 10,
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

export default SolutionsFeedCard;
