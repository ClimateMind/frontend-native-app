import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from '../../../navigation/ClimateFeedStack';

import useApiClient from '../../../hooks/useApiClient';
import PageTitle from '../../../components/PageTitle';
import ClimateFeedCard from './ClimateFeedCard';
import ClimateEffect from '../../../types/ClimateEffect';
import { useAppSelector } from '../../../store/hooks';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateFeedScreen'>;

function ClimateFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector(state => state.auth.sessionId);
  const [climateFeed, setClimateFeed] = useState<ClimateEffect[]>();

  function gotoDetailsScreen(climateEffect: ClimateEffect) {
    navigation.navigate('ClimateDetailsScreen', { climateEffect });
  }
  
  useEffect(() => {
    apiClient.getClimateFeed().then((result) => setClimateFeed(result));
  }, [sessionId]);

  if (climateFeed === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.title}>
              <PageTitle>Explore climate change impacts</PageTitle>
            </View>
            <Text style={styles.text}>
              This is your personalized homepage based on your unique climate personality. Check out
              these articles to stay informed!
            </Text>
          </>
        }
        data={climateFeed}
        renderItem={(item) => (
          <View key={item.item.effectId} style={styles.cardContainer}>
            <ClimateFeedCard climateEffect={item.item} onLearnMore={gotoDetailsScreen} />
          </View>
        )}
        keyExtractor={(item) => item.effectId}
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

export default ClimateFeedScreen;
