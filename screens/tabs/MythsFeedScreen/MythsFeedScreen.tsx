import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { MythsFeedStackParams } from '../../../navigation/MythsFeedStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Colors from '../../../assets/colors';
import useApiClient from '../../../hooks/useApiClient';
import Myth from '../../../types/Myth';
import MythsFeedCard from './MythsFeedCard';
import Headline1 from '../../../components/TextStyles/Headline1';
import BodyText from '../../../components/TextStyles/BodyText';

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
            <Headline1 style={styles.heading}>Climate change myths</Headline1>
            <BodyText style={styles.text}>
              Arm yourself with information to challenge these common myths and be part of the
              solution to fight climate change!
            </BodyText>
          </>
        }
        data={mythsFeed}
        renderItem={(item) => (
          <View key={item.item.mythTitle} style={{ margin: 10 }}>
            <MythsFeedCard myth={item.item} onLearnMore={gotoDetailsScreen} />
          </View>
        )}
        keyExtractor={(item) => item.iri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeBright,
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
});

export default MythsFeedScreen;
