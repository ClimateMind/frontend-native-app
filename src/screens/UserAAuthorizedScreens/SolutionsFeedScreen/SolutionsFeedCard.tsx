import { Pressable, StyleSheet } from "react-native";
import { Image, View } from "react-native";
import { capitalize } from "lodash";

import Solution from "src/types/Solution";
import Headline3 from "src/components/TextStyles/Headline3";
import BodyText from "src/components/TextStyles/BodyText";
import LabelText from "src/components/TextStyles/LabelText";
import ButtonText from "src/components/TextStyles/ButtonText";
import Card from "src/components/Cards/Card";

interface Props {
  solution: Solution;
  onLearnMore: (solution: Solution) => void;
}

function SolutionsFeedCard({ solution, onLearnMore }: Props) {
  return (
    <Card>

      <View style={styles.headingContainer}>
        <LabelText style={styles.actionType}>{solution.solutionType.toUpperCase()} ACTION</LabelText>
        <Headline3 style={styles.title}>{capitalize(solution.solutionTitle)}</Headline3>
      </View>

      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}
      <BodyText style={styles.text}>{solution.shortDescription}</BodyText>

      <Pressable onPress={() => onLearnMore(solution)}>
        <ButtonText style={styles.button}>MORE</ButtonText>
      </Pressable>

    </Card>
  );
}

const styles = StyleSheet.create({
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
