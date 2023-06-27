import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from '../../../navigation/ClimateFeedStack';
import { StyleSheet } from 'react-native';
import { capitalizeFirstLetter } from '../../../utils';
import ActionCard from '../../../components/ActionCard';
import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateDetailsScreen'>;

function ClimateDetailsScreen({ route }: Props) {
  const climateEffect = route.params.climateEffect;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Text style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Text>
      {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}

      <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

      {selectedTab === 0 && <View>
        <Text style={styles.description}>{climateEffect.effectDescription}</Text>
        {climateEffect.effectSolutions.map(solution => <View style={styles.actionCard} key={solution.solutionTitle}><ActionCard solution={solution} /></View>)}
      </View>}

      {selectedTab === 1 && climateEffect.effectSources.map(source => <View key={source} style={styles.links}><Text style={styles.link}>{source}</Text></View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  description: {
    letterSpacing: 1,
    padding: 10,
  },
  actionCard: {
    margin: 10,
  },
  links: {
    padding: 10,
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default ClimateDetailsScreen;
