import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from 'src/navigation/Stacks/ClimateFeedStack';

import { ActionCard } from 'src/features/climate-feed/components';

import { capitalizeFirstLetter, openUrl } from 'src/utils';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'src/services';
import { CmTypography, DetailsSourcesTab, BackButton, Screen, Section, Content } from '@shared/components';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateDetailsScreen'>;

function ClimateDetailsScreen({ navigation, route }: Props) {
  const climateEffect = route.params.climateEffect;
  const [selectedTab, setSelectedTab] = useState(0);

  // Track analytics events for card open and close
  useEffect(() => {
    analyticsService.postEvent(CardOpenEvent, climateEffect.effectId);

    return () => {
      analyticsService.postEvent(CardCloseEvent, climateEffect.effectId);
    }
  }, []);

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <BackButton onPress={() => navigation.goBack()} />

          <CmTypography variant="h3" style={styles.title}>{capitalizeFirstLetter(climateEffect.effectTitle)}</CmTypography>
          {climateEffect.imageUrl !== null && <Image style={styles.image} source={{uri: climateEffect.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <CmTypography variant='body' style={styles.description}>{climateEffect.effectDescription}</CmTypography>
            {climateEffect.effectSolutions.map(solution => <View style={{ marginVertical: 20 }} key={solution.solutionTitle}><ActionCard solution={solution} /></View>)}
          </View>}

          {selectedTab === 1 && climateEffect.effectSources.map(source => <View key={source} style={styles.links}>
            <Pressable onPress={() => openUrl(source)}><CmTypography variant='label' style={styles.link}>{source}</CmTypography></Pressable>
          </View>)}
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
    alignSelf: 'flex-start',
  },
  link: {
    paddingHorizontal: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default ClimateDetailsScreen;
