import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SolutionsFeedStackParams } from 'src/navigation/Stacks/SolutionsFeedStack';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'src/services';
import { openUrl } from 'src/utils';
import useApiClient from 'src/hooks/useApiClient';
import Myth from 'src/types/Myth';
import { MythsFeedCard } from '@features/myths-feed/components';
import { CmTypography, DetailsSourcesTab, BackButton, Screen, Section, Content } from '@shared/components';
import { ActionCardHeader } from '@features/climate-feed/components';

type Props = NativeStackScreenProps<SolutionsFeedStackParams, 'SolutionDetailsScreen'>;

function SolutionDetailsScreen({ navigation, route }: Props) {
  const apiClient = useApiClient();
  const solution = route.params.solution;

  const scrollRef = useRef<ScrollView | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [myths, setMyths] = useState<Myth[]>([]);

  useFocusEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  });

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

  // Track analytics events for card open and close
  useEffect(() => {
    analyticsService.postEvent(CardOpenEvent, solution.iri);

    return () => {
      analyticsService.postEvent(CardCloseEvent, solution.iri);
    }
  }, []);

  return (
    <Screen ref={scrollRef} style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <BackButton onPress={() => navigation.navigate('SolutionsFeedScreen')} />

          <View style={{ padding: 10 }}>
            <ActionCardHeader effectSolution={solution} color='rgba(0, 0, 0, 0)' />
          </View>
          {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <CmTypography variant='body' style={styles.description}>{solution.longDescription}</CmTypography>
            {myths?.map(myth => <View style={{ margin: 10 }} key={myth.iri}><MythsFeedCard myth={myth} onLearnMore={null} /></View>)}
            </View>}

          {selectedTab === 1 && solution.solutionSources.map(source => <View key={source} style={styles.links}>
            <Pressable onPress={() => openUrl(source)}><CmTypography variant='label' style={styles.link}>{source}</CmTypography></Pressable>
          </View>)}
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
  links: {
    alignSelf: 'flex-start',
  },
  link: {
    paddingHorizontal: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default SolutionDetailsScreen;
