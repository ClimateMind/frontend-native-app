import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import useApiClient from '../../../hooks/useApiClient';
import PageTitle from '../../../components/PageTitle';
import SolutionsFeedCard from './SolutionsFeedCard';
import Solution from '../../../types/Solution';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from '../../../navigation/SolutionsFeedStack';

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
            <View style={styles.title}>
              <PageTitle>Take action to fight climate change</PageTitle>
            </View>
            <Text style={styles.text}>
              Check out how you and your community can be part of the solution!
            </Text>
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
  },
  title: {
    margin: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  cardContainer: {
    margin: 10,
  },
});

export default SolutionsFeedScreen;
