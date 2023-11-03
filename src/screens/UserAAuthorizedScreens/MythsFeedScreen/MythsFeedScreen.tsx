import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { MythsFeedStackParams } from 'src/navigation/Stacks/MythsFeedStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useApiClient from 'src/hooks/useApiClient';
import { useAppSelector } from 'src/store/hooks';
import Myth from 'src/types/Myth';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import { CmTypography } from '@shared/components';
import MythsFeedCard from './MythsFeedCard';

type Props = NativeStackScreenProps<MythsFeedStackParams, 'MythsFeedScreen'>;

function MythsFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector((state) => state.auth.sessionId);
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
    <Screen view="View">
      <Section style={{ paddingBottom: 0 }}>
        <Content style={{ alignItems: 'stretch' }}>
          <FlatList
            ListHeaderComponent={
              <>
                <CmTypography variant='h1' style={styles.heading}>Climate change myths</CmTypography>
                <CmTypography variant='body' style={styles.text}>
                  Arm yourself with information to challenge these common myths and be part of the
                  solution to fight climate change!
                </CmTypography>
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
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
});

export default MythsFeedScreen;
