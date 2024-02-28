import { useState } from 'react';
import { View } from 'react-native';
import ColorPicker, { Panel1, Preview, Swatches } from 'reanimated-color-picker';

import { CmButton, CmTypography } from 'src/shared/components';

function CmColorPicker() {
  const [backgroundColorValue, setBackgroundColorValue] = useState('#33333333');
  const [type, setType] = useState('');
  const [textColorValue, setTextColorValue] = useState('#ffffffff');

  const handleColorSelected = (color: any) => {
    if (type === 'background') {
      setBackgroundColorValue(color.hex);
    }

    if (type === 'text') {
      setTextColorValue(color.hex);
    }
  };

  return (
    <View>
      <ColorPicker style={{ marginTop: 20 }} value="#D0EEEB" onComplete={handleColorSelected} thumbColor={'#07373b'}>
        <Preview />
        <Panel1 />
        <Swatches style={{ marginTop: 10 }} colors={['#333333', 'teal', '#07373b', '#ffffff', '#000000', '#D0EEEB']} />
      </ColorPicker>
      <CmButton text={'background'} onPress={() => setType('background')} style={{ backgroundColor: type == 'background' ? 'teal' : 'white', width: 200, alignSelf: 'center' }} />
      <CmButton text={'text'} onPress={() => setType('text')} style={{ backgroundColor: type == 'text' ? 'teal' : 'white', width: 200, alignSelf: 'center', marginTop: 10 }} />
      <CmTypography variant={'h4'} style={{ textAlign: 'left', marginVertical: 20 }}>
        Background Color Value: {backgroundColorValue.slice(0, -2)}
      </CmTypography>
      <CmTypography variant={'h4'} style={{ textAlign: 'left', marginBottom: 20 }}>
        Text Color Value: {textColorValue.slice(0, -2)}
      </CmTypography>
    </View>
  );
}

export default CmColorPicker;
