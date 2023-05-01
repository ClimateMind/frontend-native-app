import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { MythsFeedStackParams } from '../../../navigation/MythsFeedStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Myth from '../../../types/Myth';
import useApiClient from '../../../hooks/useApiClient';
import PageTitle from '../../../components/PageTitle';
import MythsFeedCard from './MythsFeedCard';

type Props = NativeStackScreenProps<MythsFeedStackParams, 'MythsFeedScreen'>;

function MythsFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const [mythsFeed, setMythsFeed] = useState<Myth[]>();

  function gotoDetailsScreen(myth: Myth) {
    navigation.navigate('MythDetailsScreen', { myth });
  }

  useEffect(() => {
    apiClient.getMythsFeed().then((result) => setMythsFeed(result));
  }, []);

  if (mythsFeed === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.title}>
              <PageTitle>Climate change myths</PageTitle>
            </View>
            <Text style={styles.text}>
              Arm yourself with information to challenge these common maths and be part of the
              solution to fight climate change!
            </Text>
          </>
        }
        data={mythsFeed}
        renderItem={(item) => (
          <View key={item.item.mythTitle} style={styles.cardContainer}>
            <MythsFeedCard myth={item.item} onLearnMore={gotoDetailsScreen} />
          </View>
        )}
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

export default MythsFeedScreen;
