import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import useApiClient from '../../../hooks/useApiClient';
import SolutionsFeedCard from './SolutionsFeedCard';
import Solution from '../../../types/Solution';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from '../../../navigation/SolutionsFeedStack';
import Headline1 from '../../../components/TextStyles/Headline1';
import BodyText from '../../../components/TextStyles/BodyText';

type Props = NativeStackScreenProps<SolutionsFeedStackParams, 'SolutionsFeedScreen'>;

function SolutionsFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const [solutionsFeed, setSolutionsFeed] = useState<Solution[]>();

  function gotoDetailsScreen(solution: Solution) {
    navigation.navigate('SolutionDetailsScreen', { solution });
  }

  useEffect(() => {
    apiClient.getSolutionsFeed().then((result) => setSolutionsFeed(result));
  }, []);

  if (solutionsFeed === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Headline1 style={styles.heading}>Take action to fight climate change</Headline1>
            <BodyText style={styles.text}>
              Check out how you and your community can be part of the solution!
            </BodyText>
          </>
        }
        data={solutionsFeed}
        renderItem={(item) => (
          <View key={item.item.solutionTitle} style={styles.cardContainer}>
            <SolutionsFeedCard solution={item.item} onLearnMore={gotoDetailsScreen} />
          </View>
        )}
        keyExtractor={(item) => item.solutionTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(138, 213, 204, 0.4)',
    padding: 10,
  },
  heading: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 8,
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  cardContainer: {
    margin: 10,
  },
});

export default SolutionsFeedScreen;
