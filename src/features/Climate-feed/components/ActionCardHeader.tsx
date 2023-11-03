import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import { capitalizeFirstLetter } from 'src/utils';
import Solution from 'src/types/Solution';
import { CmTypography } from '@shared/components';

interface Props {
  effectSolution: Solution;
  color?: string;
}

function ActionCardHeader({ effectSolution, color = '#FDED6D' }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.imageContainer}>
        {effectSolution.solutionType === 'mitigation' && <MaterialIcons name="lightbulb" size={24} color="black" />}
        {effectSolution.solutionType === 'adaptation' && <Foundation name="shield" size={24} color="black" />}
      </View>
      <View style={styles.textContainer}>
        <CmTypography variant='label' style={{ fontSize: 10 }}>{effectSolution.solutionType.toUpperCase()} ACTION</CmTypography>
        <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(effectSolution.solutionTitle)}</CmTypography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    width: '80%',
    gap: -5,
    paddingVertical: 10,
  },
  title: {
    width: '90%',
    textAlign: 'left',
  },
});

export default ActionCardHeader;
