import { CmButton, CmTypography, Content, Screen } from 'src/shared/components';
import { useOnboarding } from 'src/features/onboarding/hooks';

function DevScreen() {
  const { resetOnboarding } = useOnboarding();

  return (
    <Screen>
      <Content>
        <CmTypography variant="h2" style={{ padding: 20 }}>
          Dev Screen
        </CmTypography>

        <CmButton onPress={resetOnboarding} text="Reset Onboarding" />
      </Content>
    </Screen>
  );
}

export default DevScreen;
