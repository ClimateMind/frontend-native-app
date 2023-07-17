import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from '../../../navigation/SolutionsFeedStack';

import useApiClient from '../../../hooks/useApiClient';
import Myth from '../../../types/Myth';
import MythsFeedCard from '../MythsFeedScreen/MythsFeedCard';
import ActionCardHeader from '../ClimateFeedScreen/ActionCardHeader';
import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';
import CaptionText from '../../../components/TextStyles/CaptionText';
import LabelText from '../../../components/TextStyles/LabelText';

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
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.header}>
        <ActionCardHeader effectSolution={solution} color='rgba(0, 0, 0, 0)' />
      </View>
      {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

      <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

      {selectedTab === 0 && <View>
        <CaptionText style={styles.description}>{solution.longDescription}</CaptionText>
        {myths?.map(myth => <View style={styles.mythCard} key={myth.iri}><MythsFeedCard myth={myth} onLearnMore={null} /></View>)}
        </View>}

      {selectedTab === 1 && solution.solutionSources.map(source => <View key={source} style={styles.links}><LabelText style={styles.link}>{source}</LabelText></View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  description: {
    letterSpacing: 1,
    lineHeight: 20,
    padding: 20,
  },
  mythCard: {
    margin: 10,
  },
  links: {
    padding: 10,
  },
  link: {
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default SolutionDetailsScreen;
