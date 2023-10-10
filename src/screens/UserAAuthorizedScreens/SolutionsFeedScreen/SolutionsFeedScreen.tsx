import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import useApiClient from 'src/hooks/useApiClient';
import Solution from 'src/types/Solution';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import { CmTypography } from 'src/components';
import SolutionsFeedCard from './SolutionsFeedCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from 'src/navigation/Stacks/SolutionsFeedStack';
import { useAppSelector } from 'src/store/hooks';

type Props = NativeStackScreenProps<SolutionsFeedStackParams, 'SolutionsFeedScreen'>;

function SolutionsFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const [solutionsFeed, setSolutionsFeed] = useState<Solution[]>();

  function gotoDetailsScreen(solution: Solution) {
    navigation.navigate('SolutionDetailsScreen', { solution });
  }

  useEffect(() => {
    apiClient.getSolutionsFeed().then((result) => setSolutionsFeed(result));
  }, [sessionId]);

  if (solutionsFeed === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }

  return (
    <Screen view="View">
      <Section style={{ paddingBottom: 0 }}>
        <Content style={{ alignItems: 'stretch' }}>
          <FlatList
            ListHeaderComponent={
              <>
                <CmTypography variant='h1' style={styles.heading}>Take action to fight climate change</CmTypography>
                <CmTypography variant='body' style={styles.text}>
                  Check out how you and your community can be part of the solution!
                </CmTypography>
              </>
            }
            data={solutionsFeed}
            renderItem={(item) => (
              <View key={item.item.solutionTitle} style={{ margin: 10 }}>
                <SolutionsFeedCard solution={item.item} onLearnMore={gotoDetailsScreen} />
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

export default SolutionsFeedScreen;
