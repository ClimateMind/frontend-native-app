import { StyleSheet, View } from 'react-native';

import appConfig from '../../../app.json';
import { CmButton, CmTypography, Content, Screen } from 'src/shared/components';
import { useOnboarding } from 'src/features/onboarding/hooks';
import { UpdateButton } from 'src/features/dev';

function DevScreen() {
  const { resetOnboarding } = useOnboarding();

  return (
    <Screen>
      <Content>
        <CmTypography variant="h2" style={{ padding: 20 }}>
          Dev Screen
        </CmTypography>

        <CmButton onPress={resetOnboarding} text="Reset Onboarding" style={styles.btn} />

        <UpdateButton />

        <View style={{ flex: 1 }} />
        <CmTypography variant='body' style={{ marginBottom: 20 }}>Version {appConfig.expo.version}</CmTypography>
      </Content>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default DevScreen;
