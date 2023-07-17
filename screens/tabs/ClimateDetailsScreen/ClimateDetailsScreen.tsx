import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from '../../../navigation/ClimateFeedStack';
import { StyleSheet } from 'react-native';
import { capitalizeFirstLetter } from '../../../utils';
import ActionCard from '../../../components/ActionCard';
import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';
import BodyText from '../../../components/TextStyles/BodyText';
import CaptionText from '../../../components/TextStyles/CaptionText';
import LabelText from '../../../components/TextStyles/LabelText';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateDetailsScreen'>;

function ClimateDetailsScreen({ route }: Props) {
  const climateEffect = route.params.climateEffect;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <BodyText style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</BodyText>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}

      <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

      {selectedTab === 0 && <View>
        <CaptionText style={styles.description}>{climateEffect.effectDescription}</CaptionText>
        {climateEffect.effectSolutions.map(solution => <View style={styles.actionCard} key={solution.solutionTitle}><ActionCard solution={solution} /></View>)}
      </View>}

      {selectedTab === 1 && climateEffect.effectSources.map(source => <View key={source} style={styles.links}><LabelText style={styles.link}>{source}</LabelText></View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 15,
    paddingVertical: 20,
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
  actionCard: {
    marginVertical: 20,
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

export default ClimateDetailsScreen;
