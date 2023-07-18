import { Pressable, StyleSheet } from "react-native";
import { Image, View } from "react-native";

import { capitalizeFirstLetter } from "../../../utils";
import Solution from "../../../types/Solution";
import Headline3 from "../../../components/TextStyles/Headline3";
import BodyText from "../../../components/TextStyles/BodyText";
import LabelText from "../../../components/TextStyles/LabelText";
import ButtonText from "../../../components/TextStyles/ButtonText";

interface Props {
  solution: Solution;
  onLearnMore: (solution: Solution) => void;
}

function SolutionsFeedCard({ solution, onLearnMore }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headingContainer}>
        <LabelText style={styles.actionType}>{solution.solutionType.toUpperCase()} ACTION</LabelText>
        <Headline3 style={styles.title}>{capitalizeFirstLetter(solution.solutionTitle)}</Headline3>
      </View>

      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}
      <BodyText style={styles.text}>{solution.shortDescription}</BodyText>

      <Pressable onPress={() => onLearnMore(solution)}>
        <ButtonText style={styles.button}>MORE</ButtonText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  headingContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  actionType: {
    fontSize: 8,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  title: {
    paddingHorizontal: 10,
    marginBottom: 10,
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

export default SolutionsFeedCard;
