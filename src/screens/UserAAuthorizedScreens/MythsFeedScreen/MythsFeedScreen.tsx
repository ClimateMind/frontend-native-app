import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { MythsFeedStackParams } from 'src/navigation/Stacks/MythsFeedStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useApiClient from 'src/hooks/useApiClient';
import Myth from 'src/types/Myth';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import Headline1 from 'src/components/TextStyles/Headline1';
import MythsFeedCard from './MythsFeedCard';
import BodyText from 'src/components/TextStyles/BodyText';
import { useAppSelector } from 'src/store/hooks';

type Props = NativeStackScreenProps<MythsFeedStackParams, 'MythsFeedScreen'>;

function MythsFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector(state => state.auth.sessionId);
  const [mythsFeed, setMythsFeed] = useState<Myth[]>();

  function gotoDetailsScreen(myth: Myth) {
    navigation.navigate('MythDetailsScreen', { myth });
  }

  useEffect(() => {
    apiClient.getMythsFeed().then((result) => setMythsFeed(result));
  }, [sessionId]);

  if (mythsFeed === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }

  return (
    <Screen view='View'>
      <Section>
        <Content style={{ alignItems: 'stretch' }}>
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
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({

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