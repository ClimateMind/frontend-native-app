import { StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { capitalize } from "lodash";

import Solution2 from "src/types/Solution2";
import Headline3 from "src/components/TextStyles/Headline3";
import LabelText from "src/components/TextStyles/LabelText";

interface Props {
  effectSolution: Solution2;
  color?: string;
}

function ActionCardHeader({ effectSolution, color='#FDED6D' }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.imageContainer}>
        {effectSolution.solutionType[0] === 'mitigation' && <MaterialIcons name="lightbulb" size={24} color="black" />}
        {effectSolution.solutionType[1] === 'adaptation' && <Foundation name="shield" size={24} color="black" />}
      </View>
      <View style={styles.textContainer}>
        <LabelText style={{ fontSize: 10 }}>{effectSolution.solutionType[0].toUpperCase()} ACTION</LabelText>
        <Headline3 style={styles.title}>{capitalize(effectSolution.solutionTitle)}</Headline3>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    width: '90%',
    gap: -5,
  },
  title: {
    width: '90%',
    textAlign: 'left',
  },
});

export default ActionCardHeader;
