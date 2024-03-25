import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';

import appConfig from '../../../app.json';
import { CmButton, CmCheckbox, CmTypography, Content, Screen } from '@shared/components';
import { useOnboarding } from '@features/onboarding/hooks';
import { useUpdateApp, useSkipAnalytics, CmColorPicker } from '@features/dev';
import { useToastMessages } from '@shared/hooks';
import CmCarousel from 'src/shared/components/CmCarousel/CmCarousel';
import { PersonalValueCard } from 'src/features/quiz/components';

function DevScreen() {
  const { resetOnboarding } = useOnboarding();
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

        <CmButton onPress={resetOnboarding} text="Reset Onboarding" style={styles.btn} />
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

        {showExperimentalFeatures && (
          <View style={{ paddingHorizontal: 20 }}>
            {/* <CmColorPicker /> */}
            {/* Add features to test here */}

            <CmCarousel
              data={[
                <PersonalValueCard
                  nr={0}
                  value={{
                    id: '1',
                    name: 'power',
                    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  }}
                />,

                <PersonalValueCard
                  nr={0}
                  value={{
                    id: '1',
                    name: 'power',
                    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  }}
                />,
              ]}
            />
            <CmCarousel
              data={[
                <PersonalValueCard
                  nr={0}
                  value={{
                    id: '1',
                    name: 'power',
                    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  }}
                />,
                <PersonalValueCard
                  nr={0}
                  value={{
                    id: '1',
                    name: 'power',
                    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  }}
                />,
              ]}
            />
            <CmCarousel
              data={[
                <PersonalValueCard
                  nr={0}
                  value={{
                    id: '1',
                    name: 'power',
                    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  }}
                />,
                <PersonalValueCard
                  nr={0}
                  value={{
                    id: '1',
                    name: 'power',
                    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis libero culpa ipsum porro, nisi alias reiciendis provident molestiae eius fugiat quo molestias a rem unde hic nulla quisquam fugit',
                  }}
                />,
              ]}
            />
          </View>
        )}

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
