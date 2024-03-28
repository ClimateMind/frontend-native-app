import { Dimensions, StyleSheet } from 'react-native';
import { Image, View } from 'react-native';

import { capitalizeFirstLetter } from 'src/utils';
import Solution from 'src/types/Solution';
import { CmTypography, Card } from '@shared/components';

interface Props {
  solution: Solution;
}

function SolutionsFeedCard({ solution }: Props) {
  return (
    <Card style={{ width: '100%', height: 430 }}>
      <View style={styles.headingContainer}>
        <CmTypography variant="label" style={styles.actionType}></CmTypography>
        <CmTypography variant="h4" style={styles.title}>
          {capitalizeFirstLetter(solution.solutionTitle)}
        </CmTypography>
      </View>

      {solution.imageUrl !== null && <Image style={styles.image} source={{ uri: solution.imageUrl }} />}
      <CmTypography variant="body" style={styles.text} numberOfLines={4} ellipsizeMode="tail">
        {solution.shortDescription}
      </CmTypography>
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
    // width: Dimensions.get('window').width,
    height: 200,
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
