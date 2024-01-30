import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CmTypography from './CmTypography';

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

function BackButton({ onPress, style }: Props) {
  return (
    <Pressable style={[styles.backButtonContainer, style]} onPress={onPress}>
      <Ionicons name="chevron-back-outline" size={24} color="#A347FF" />
      <CmTypography variant='button' style={styles.backButtonText}>
        BACK
      </CmTypography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    // Padding to make the button easier to press
    paddingVertical: 5,
    paddingRight: 10,
  },
  backButtonText: {
    marginLeft: 10,
  },
});

export default BackButton;
