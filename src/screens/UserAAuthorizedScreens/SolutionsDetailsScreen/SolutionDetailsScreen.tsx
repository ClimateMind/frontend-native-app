import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from 'src/navigation/Stacks/SolutionsFeedStack';

import useApiClient from 'src/hooks/useApiClient';
import Myth from 'src/types/Myth';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import MythsFeedCard from '../MythsFeedScreen/MythsFeedCard';
import ActionCardHeader from '../ClimateFeedScreen/ActionCardHeader';
import DetailsSourcesTab from 'src/components/DetailsSourcesTabs';
import { CmTypography } from 'src/components';
import BackButton from 'src/components/BackButton';
import { A } from '@expo/html-elements';

type Props = NativeStackScreenProps<SolutionsFeedStackParams, 'SolutionDetailsScreen'>;

function SolutionDetailsScreen({ navigation, route }: Props) {
  const apiClient = useApiClient();
  const solution = route.params.solution;

  const [selectedTab, setSelectedTab] = useState(0);
  const [myths, setMyths] = useState<Myth[]>([]);

  useEffect(() => {
    solution.solutionSpecificMythIRIs.forEach(async (iri) => {
      const myth = await apiClient.getMyth(iri);
      setMyths(current => {
        if (current.map(m => m.iri).includes(myth.iri)) {
          return [...current];
        }
        return [...current, myth];
      });
    });
  }, [solution, setMyths]);

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <BackButton onPress={() => navigation.goBack()} />

          <View style={{ padding: 10 }}>
            <ActionCardHeader effectSolution={solution} color='rgba(0, 0, 0, 0)' />
          </View>
          {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <CmTypography variant='body' style={styles.description}>{solution.longDescription}</CmTypography>
            {myths?.map(myth => <View style={{ margin: 10 }} key={myth.iri}><MythsFeedCard myth={myth} onLearnMore={null} /></View>)}
            </View>}

          {selectedTab === 1 && solution.solutionSources.map(source => <View key={source} style={{ padding: 10 }}><CmTypography variant='label' style={styles.link}><A href={source}>{source}</A></CmTypography></View>)}
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    height: 250,
  },
  description: {
    letterSpacing: 1,
    lineHeight: 20,
    padding: 20,
  },
  link: {
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default SolutionDetailsScreen;
