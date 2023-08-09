import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from '../../../navigation/Stacks/ClimateFeedStack';

import useApiClient from '../../../hooks/useApiClient';
import Headline1 from '../../../components/TextStyles/Headline1';
import ClimateFeedCard from './ClimateFeedCard';
import ClimateEffect from '../../../types/ClimateEffect';
import { useAppSelector } from '../../../store/hooks';
import BodyText from '../../../components/TextStyles/BodyText';

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
            <Headline1 style={styles.heading}>Explore climate change impacts</Headline1>
            <BodyText style={styles.text}>
              This is your personalized homepage based on your unique climate personality. Check out
              these articles to stay informed!
            </BodyText>
          </>
        }
        data={climateFeed}
        renderItem={(item) => (
          <View key={item.item.effectId} style={{ margin: 10 }}>
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
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default ClimateFeedScreen;
