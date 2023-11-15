import { View } from 'react-native';

import { CmTypography } from 'src/shared/components';

function DevScreen() {
  return (
    <View>
      <CmTypography variant="h2" style={{ padding: 20 }}>
        DevScreen
      </CmTypography>

      {/* <CmButton onPress={onResetOnboarding} text="Reset Onboarding" /> */}
    </View>
  );
}

export default DevScreen;
