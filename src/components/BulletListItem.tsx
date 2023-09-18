import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { CmTypography } from '.';

interface Props {
  children: string;
  textStyle?: StyleProp<ViewStyle>;
}

function BulletListItem({ children, textStyle = {} }: Props) {
  return (
    <View style={styles.container}>
      <Entypo name="dot-single" size={24} color="black" />

      {/* This View with flex: 1 is a fix. Otherwise the text might be cutoff at the end of the sentence. */}
      <View style={{ flex: 1 }}>
        <CmTypography variant='body' style={textStyle}>{children}</CmTypography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default BulletListItem;
