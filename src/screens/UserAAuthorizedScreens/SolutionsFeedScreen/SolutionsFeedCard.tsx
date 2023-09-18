import { Pressable, StyleSheet } from "react-native";
import { Image, View } from "react-native";
import { capitalize } from "lodash";

import Solution from "src/types/Solution";
import { CmTypography } from "src/components";
import Card from "src/components/Cards/Card";

interface Props {
  solution: Solution;
  onLearnMore: (solution: Solution) => void;
}

function SolutionsFeedCard({ solution, onLearnMore }: Props) {
  return (
    <Card>

      <View style={styles.headingContainer}>
        <CmTypography variant='label' style={styles.actionType}>{solution.solutionType.toUpperCase()} ACTION</CmTypography>
        <CmTypography variant='h3' style={styles.title}>{capitalize(solution.solutionTitle)}</CmTypography>
      </View>

      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}
      <CmTypography variant='body' style={styles.text}>{solution.shortDescription}</CmTypography>

      <Pressable onPress={() => onLearnMore(solution)}>
        <CmTypography variant='button' style={styles.button}>MORE</CmTypography>
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
