import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'src/services';
import { capitalizeFirstLetter } from 'src/utils';
import ClimateSolution from 'src/types/Solution3';
import { CmTypography, Card  } from '@shared/components';

interface Props {
  solution: ClimateSolution;
  onLearnMore: (solution: ClimateSolution) => void;
}

function SolutionsFeedCard({ solution, onLearnMore }: Props) {
  // Track analytics events for card open and close
  useEffect(() => {
    analyticsService.postEvent(CardOpenEvent, solution.solutionId);

    return () => {
      analyticsService.postEvent(CardCloseEvent, solution.solutionId);
    }
  }, []);

  return (
    <Card>
      <View style={styles.headingContainer}>
        <CmTypography variant='label' style={styles.actionType}>{solution.solutionType[0].toUpperCase()} ACTION</CmTypography>
        <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(solution.solutionTitle)}</CmTypography>
      </View>

      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}
      <CmTypography variant='body' style={styles.text}>{solution.solutionShortDescription}</CmTypography>

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
