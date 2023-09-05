import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import useApiClient from '../../../hooks/useApiClient';
import Solution from '../../../types/Solution';
import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';
import SolutionsFeedCard from './SolutionsFeedCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from '../../../navigation/Stacks/SolutionsFeedStack';
import Headline1 from '../../../components/TextStyles/Headline1';
import BodyText from '../../../components/TextStyles/BodyText';
import { useAppSelector } from '../../../store/hooks';

type Props = NativeStackScreenProps<SolutionsFeedStackParams, 'SolutionsFeedScreen'>;

function SolutionsFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector(state => state.auth.sessionId);
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
    <Screen view='View'>
      <Section>
        <Content style={{ alignItems: 'stretch' }}>
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
    paddingTop: 8,
  },
  text: {
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
});

export default SolutionsFeedScreen;
