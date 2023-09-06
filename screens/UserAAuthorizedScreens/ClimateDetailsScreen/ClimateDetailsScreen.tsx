import { useState } from 'react';
import { Image, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from '../../../navigation/Stacks/ClimateFeedStack';
import { StyleSheet } from 'react-native';
import { capitalizeFirstLetter } from '../../../utils';
import ActionCard from './ActionCard';
import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';

import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';
import Headline3 from '../../../components/TextStyles/Headline3';
import BodyText from '../../../components/TextStyles/BodyText';
import LabelText from '../../../components/TextStyles/LabelText';
import BackButton from '../../../components/BackButton';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateDetailsScreen'>;

function ClimateDetailsScreen({ navigation, route }: Props) {  
  const climateEffect = route.params.climateEffect;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <BackButton onPress={() => navigation.goBack()} />

          <Headline3 style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</Headline3>
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
