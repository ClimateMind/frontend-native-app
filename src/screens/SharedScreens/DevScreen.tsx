import { StyleSheet, View } from 'react-native';

import appConfig from '../../../app.json';
import { CmButton, CmCheckbox, CmTypography, Content, Screen } from 'src/shared/components';
import { useOnboarding } from 'src/features/onboarding/hooks';
import { useUpdateApp, useSkipAnalytics } from 'src/features/dev';
import { useToastMessages } from 'src/shared/hooks';
import { useState } from 'react';
import ColorPicker, { Swatches, Preview, BrightnessSlider } from 'reanimated-color-picker';
import CmToolTip from 'src/experimental/components/CmTooltip';

function DevScreen() {
  const { resetOnboarding } = useOnboarding();
  const { isLoading, updateApp, buttonText } = useUpdateApp();
  const { skipAnalytics, skipAnalyticsCheckboxHandler } = useSkipAnalytics();
  const { showSuccessToast, showErrorToast } = useToastMessages();
  const [showExperimentalFeatures, setShowExperimentalFeatures] = useState(false);
  const [backgroundColorValue, setBackgroundColorValue] = useState('#333333');
  const [type, setType] = useState('');
  const [textColorValue, setTextColorValue] = useState('#ffffff');
  const cmTooltipLabels = ['benevolence', 'hedonism', 'security', 'tradition', 'universalism', 'self-direction', 'conformity', 'stimulation', 'achievement', 'stimulation'];

  const handleColorSelected = (color: any) => {
    if (type === 'background') {
      setBackgroundColorValue(color.hex.slice(0, -2));
    }

    if (type === 'text') {
      setTextColorValue(color.hex.slice(0, -2));
    }
  };

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
          <>
            <View>
              <ColorPicker style={{ width: '100%', marginTop: 20 }} value="#D0EEEB" onComplete={handleColorSelected} thumbColor={'#07373b'}>
                <Preview />
                <BrightnessSlider style={{ marginTop: 15 }} />
                <Swatches style={{ marginTop: 15 }} colors={['#333333', 'teal', '#07373b', '#ffffff', '#000000', '#D0EEEB']} />
              </ColorPicker>

              <CmButton text={'background'} onPress={() => setType('background')} style={{ backgroundColor: type == 'background' ? 'teal' : 'white', minWidth: '70%', alignSelf: 'center' }} />
              <CmButton text={'text'} onPress={() => setType('text')} style={{ backgroundColor: type == 'text' ? 'teal' : 'white', minWidth: '70%', alignSelf: 'center', marginTop: 10 }} />
              <CmTypography variant={'h4'} style={{ textAlign: 'left', marginVertical: 20 }}>
                Background Color Value: {backgroundColorValue}
              </CmTypography>
              <CmTypography variant={'h4'} style={{ textAlign: 'left', marginBottom: 20 }}>
                Text Color Value: {textColorValue}
              </CmTypography>
            </View>
            {/* Add Features to test below */}
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {cmTooltipLabels.map((value, i) => (
                <CmToolTip key={i + 1} label={value} backgroundColor={backgroundColorValue} textColor={textColorValue} />
              ))}
            </View>
          </>
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorPicker: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default DevScreen;
