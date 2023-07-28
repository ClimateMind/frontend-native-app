import { Image, Pressable, StyleSheet, View } from "react-native";

import Solution from "../../../types/Solution";
import ActionCardHeader from "../ClimateFeedScreen/ActionCardHeader";
import BodyText from "../../../components/TextStyles/BodyText";
import ButtonText from "../../../components/TextStyles/ButtonText";

interface Props {
  solution: Solution;
  color?: string;
}

function ActionCard({ solution, color = '#FDED6D' }: Props) {
  return (
    <View style={{ backgroundColor: color }}>
      <ActionCardHeader effectSolution={solution} />
      {solution.imageUrl !== null && (
        <Image style={styles.image} source={{ uri: solution.imageUrl }} />
      )}

      <BodyText style={styles.description}>{solution.shortDescription}</BodyText>
      <Pressable>
        <ButtonText style={styles.button}>LEARN MORE</ButtonText>
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
    letterSpacing: 1.3,
    fontSize: 15,
    lineHeight: 23,
    padding: 20,
  },
  button: {
    paddingTop: 25,
    paddingBottom: 20,
    paddingLeft: 20,
    textAlign: 'left',
  },
});

export default ActionCard;
