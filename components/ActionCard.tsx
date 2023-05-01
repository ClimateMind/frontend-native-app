import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Solution from "../types/Solution";
import ActionCardHeader from "../screens/tabs/ClimateFeedScreen/ActionCardHeader";

interface Props {
  solution: Solution;
  color?: string;
}

function ActionCard({ solution, color='#FDED6D' }: Props) {
  return (
    <View style={{ backgroundColor: color }}>
      <ActionCardHeader effectSolution={solution} />
      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

      <Text style={styles.description}>{solution.shortDescription}</Text>
      <Pressable>
        <Text style={styles.button}>LEARN MORE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  description: {
    letterSpacing: 1,
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
