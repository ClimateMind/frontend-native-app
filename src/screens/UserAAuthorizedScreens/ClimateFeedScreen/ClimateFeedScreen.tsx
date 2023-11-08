import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from 'src/navigation/Stacks/ClimateFeedStack';

import useApiClient from 'src/hooks/useApiClient';
import ClimateEffect from 'src/types/ClimateEffect';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import { CmTypography } from '@shared/components';
import { ClimateFeedCard } from 'src/features/Climate-feed/components';
import { useAppSelector } from 'src/store/hooks';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateFeedScreen'>;

function ClimateFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector((state) => state.auth.sessionId);
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
    <Screen view="View">
      <Section style={{ paddingBottom: 0 }}>
        <Content style={{ alignItems: 'stretch' }}>
          <FlatList
            ListHeaderComponent={
              <>
                <CmTypography variant='h1' style={styles.heading}>Explore climate change impacts</CmTypography>
                <CmTypography variant='body' style={styles.text}>
                  This is your personalized homepage based on your unique climate personality. Check out
                  these articles to stay informed!
                </CmTypography>
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
    marginTop: 20,
  },
});

export default ClimateFeedScreen;
