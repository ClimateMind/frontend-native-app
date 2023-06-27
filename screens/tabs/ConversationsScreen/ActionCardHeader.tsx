import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import Solution2 from "../../../types/Solution2";
import { capitalizeFirstLetter } from "../../../utils";

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
        <Text style={styles.actionType}>{effectSolution.solutionType[0].toUpperCase()} ACTION</Text>
        <Text style={styles.title}>{capitalizeFirstLetter(effectSolution.solutionTitle)}</Text>
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
  actionType: {
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  title: {
    fontWeight: '400',
    fontSize: 18,
    width: '90%',
  },
});

export default ActionCardHeader;
