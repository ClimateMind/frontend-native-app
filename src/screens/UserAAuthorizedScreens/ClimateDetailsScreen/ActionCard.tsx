import { Image, Pressable, StyleSheet, View } from 'react-native';

import Solution from 'src/types/Solution';
import ActionCardHeader from '../ClimateFeedScreen/ActionCardHeader';
import { CmTypography } from 'src/components';

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

      <CmTypography variant="body" style={styles.description}>
        {solution.shortDescription}
      </CmTypography>
      <Pressable>
        <CmTypography variant="button" style={styles.button}>
          LEARN MORE
        </CmTypography>
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
