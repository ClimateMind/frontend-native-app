import { StyleSheet, View } from 'react-native';

import appConfig from '../../../app.json';
import { CmButton, CmCheckbox, CmTypography, Content, Screen } from 'src/shared/components';
import { useOnboarding } from 'src/features/onboarding/hooks';
import { useUpdateApp, useSkipAnalytics } from 'src/features/dev';

function DevScreen() {
  const { resetOnboarding } = useOnboarding();
  const { isLoading, updateApp, buttonText } = useUpdateApp();
  const { skipAnalytics, skipAnalyticsCheckboxHandler } = useSkipAnalytics();

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

        <View style={{ flex: 1 }} />
        <CmTypography variant='body' style={{ marginBottom: 20 }}>Version {appConfig.expo.version}</CmTypography>
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
