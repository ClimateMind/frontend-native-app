import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { capitalize } from 'lodash';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from 'src/navigation/Stacks/ClimateFeedStack';
import ActionCard from './ActionCard';
import DetailsSourcesTab from 'src/components/DetailsSourcesTabs';

import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import Headline3 from 'src/components/TextStyles/Headline3';
import BodyText from 'src/components/TextStyles/BodyText';
import LabelText from 'src/components/TextStyles/LabelText';
import BackButton from 'src/components/BackButton';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateDetailsScreen'>;

function ClimateDetailsScreen({ navigation, route }: Props) {  
  const climateEffect = route.params.climateEffect;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <BackButton onPress={() => navigation.goBack()} />

          <Headline3 style={styles.title}>{capitalize(climateEffect.effectTitle)}</Headline3>
          {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <BodyText style={styles.description}>{climateEffect.effectDescription}</BodyText>
            {climateEffect.effectSolutions.map(solution => <View style={{ marginVertical: 20 }} key={solution.solutionTitle}><ActionCard solution={solution} /></View>)}
          </View>}

          {selectedTab === 1 && climateEffect.effectSources.map(source => <View key={source} style={styles.links}><LabelText style={styles.link}>{source}</LabelText></View>)}
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 15,
    paddingVertical: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
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
    padding: 10,
  },
  link: {
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default ClimateDetailsScreen;
