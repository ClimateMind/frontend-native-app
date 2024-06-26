import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import appConfig from '../../../app.json';
import { CmButton, CmCheckbox, CmTypography, Content, Screen } from '@shared/components';
import { useUpdateApp, useSkipAnalytics } from '@features/dev';
import { useToastMessages } from '@shared/hooks';
import CmCarousel from 'src/experimental/components/CmCarousel/CmCarousel';
import PersonalValueCard from 'src/experimental/components/PersonalValueCard';
import ClimateFeedCard from 'src/experimental/components/ClimateFeedCard';

import SolutionsFeedCard from 'src/experimental/components/SolutionsFeedCard';

function DevScreen() {
  const { isLoading, updateApp, buttonText } = useUpdateApp();
  const { skipAnalytics, skipAnalyticsCheckboxHandler } = useSkipAnalytics();
  const { showSuccessToast, showErrorToast } = useToastMessages();
  const [showExperimentalFeatures, setShowExperimentalFeatures] = useState(false);

  return (
    <Screen>
      <Content style={{ padding: 20 }}>
        <CmTypography variant="h2" style={{ paddingVertical: 20 }}>
          Dev Screen
        </CmTypography>

        <CmButton isLoading={isLoading} onPress={updateApp} text={buttonText} style={styles.btn} />

        <View style={{ alignSelf: 'flex-start' }}>
          <CmCheckbox checked={skipAnalytics} onPress={skipAnalyticsCheckboxHandler} text="Don't track analytics events" />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <View style={{ flex: 1 }}>
            <CmButton style={[styles.btn, { flex: 1 }]} onPress={() => showSuccessToast('Hello you!')} text="Show Success Toast" />
          </View>
          <View style={{ flex: 1 }}>
            <CmButton onPress={() => showErrorToast('Hello you!')} text="Show Error Toast" style={styles.btn} />
          </View>
        </View>

        <View style={{ alignSelf: 'flex-start' }}>
          <CmCheckbox checked={showExperimentalFeatures} onPress={() => setShowExperimentalFeatures((prevState) => !prevState)} text="Show Experimental Features" />
        </View>
      </Content>

      {showExperimentalFeatures && (
        <>
          {/* Add features to test here */}
          <CmCarousel
            data={[
              <PersonalValueCard
                nr={1}
                value={{
                  id: '1',
                  name: 'security',
                  shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                }}
              />,

              <ClimateFeedCard
                climateEffect={{
                  effectId: 'R8t0oNsG3WgnupXsBVSjMHZ',
                  effectTitle: 'Example Related Impact - Decrease in tourism',
                  effectDescription: '',
                  effectShortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  effectSolutions: [],
                  effectSources: [],
                  effectScore: 0,
                  imageUrl: 'https://i.imgur.com/BZ2gRk3.jpg',
                  actionHeadline: '',
                  isPossiblyLocal: 0,
                  effectSpecificMythIRIs: [],
                  relatedPersonalValues: undefined,
                }}
              />,

              <SolutionsFeedCard
                solution={{
                  iri: '',
                  imageUrl: 'https://i.imgur.com/toV6zMh.jpg',
                  longDescription: '',
                  shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  solutionTitle: 'Example Mitigation Solution - Producing electricity via onshore wind turbines ',
                  solutionSources: [],
                  solutionType: 'adaptation',
                  solutionSpecificMythIRIs: [],
                }}
              />,
            ]}
          />

          <CmCarousel
            data={[
              <PersonalValueCard
                nr={2}
                value={{
                  id: '1',
                  name: 'achievement',
                  shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                }}
              />,

              <ClimateFeedCard
                climateEffect={{
                  effectId: 'R8t0oNsG3WgnupXsBVSjMHZ',
                  effectTitle: 'Example Related Impact - Increase in coral bleaching and destruction',
                  effectDescription: '',
                  effectShortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  effectSolutions: [],
                  effectSources: [],
                  effectScore: 0,
                  imageUrl: 'https://i.imgur.com/ktZeIPJ.jpg',
                  actionHeadline: '',
                  isPossiblyLocal: 0,
                  effectSpecificMythIRIs: [],
                  relatedPersonalValues: undefined,
                }}
              />,

              <SolutionsFeedCard
                solution={{
                  iri: '',
                  imageUrl: 'https://i.imgur.com/0XBZ5Wo.jpg',
                  longDescription: '',
                  shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  solutionTitle: 'Example Mitigation Solution - Vote in elections ',
                  solutionSources: [],
                  solutionType: 'adaptation',
                  solutionSpecificMythIRIs: [],
                }}
              />,
            ]}
          />

          <CmCarousel
            data={[
              <PersonalValueCard
                nr={3}
                value={{
                  id: '1',
                  name: 'hedonism',
                  shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                }}
              />,

              <ClimateFeedCard
                climateEffect={{
                  effectId: 'R8t0oNsG3WgnupXsBVSjMHZ',
                  effectTitle: 'Example Related Impact - Increase in suicide',
                  effectDescription: '',
                  effectShortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  effectSolutions: [],
                  effectSources: [],
                  effectScore: 0,
                  imageUrl: 'https://i.imgur.com/AjyIno0.jpg',
                  actionHeadline: '',
                  isPossiblyLocal: 0,
                  effectSpecificMythIRIs: [],
                  relatedPersonalValues: undefined,
                }}
              />,

              <SolutionsFeedCard
                solution={{
                  iri: '',
                  imageUrl: 'https://i.imgur.com/FrZHYSK.jpg',
                  longDescription: '',
                  shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  solutionTitle: 'Example Mitigation Solution - managing refrigerants better',
                  solutionSources: [],
                  solutionType: 'adaptation',
                  solutionSpecificMythIRIs: [],
                }}
              />,
            ]}
          />
        </>
      )}

      <Content style={{ padding: 20 }}>
        <View style={{ flex: 1 }} />

        <CmTypography variant="body" style={{ marginBottom: 20 }}>
          Version {appConfig.expo.version}
        </CmTypography>
      </Content>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
});

export default DevScreen;
