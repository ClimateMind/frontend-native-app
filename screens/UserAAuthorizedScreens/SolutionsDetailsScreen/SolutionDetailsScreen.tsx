import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from '../../../navigation/Stacks/SolutionsFeedStack';

import useApiClient from '../../../hooks/useApiClient';
import Myth from '../../../types/Myth';
import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';
import MythsFeedCard from '../MythsFeedScreen/MythsFeedCard';
import ActionCardHeader from '../ClimateFeedScreen/ActionCardHeader';
import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';
import LabelText from '../../../components/TextStyles/LabelText';
import BodyText from '../../../components/TextStyles/BodyText';

type Props = NativeStackScreenProps<SolutionsFeedStackParams, 'SolutionDetailsScreen'>;

function SolutionDetailsScreen({ route }: Props) {
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
        return [...current, myth]
      })
    })
  }, [solution, setMyths]);
  
  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <View style={{ padding: 10 }}>
            <ActionCardHeader effectSolution={solution} color='rgba(0, 0, 0, 0)' />
          </View>
          {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <BodyText style={styles.description}>{solution.longDescription}</BodyText>
            {myths?.map(myth => <View style={{ margin: 10 }} key={myth.iri}><MythsFeedCard myth={myth} onLearnMore={null} /></View>)}
            </View>}

          {selectedTab === 1 && solution.solutionSources.map(source => <View key={source} style={{ padding: 10 }}><LabelText style={styles.link}>{source}</LabelText></View>)}
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
