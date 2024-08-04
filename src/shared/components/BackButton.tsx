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
      <Ionicons name="chevron-back-outline" size={24} color="#07373B" />
      <CmTypography variant="button" style={styles.backButtonText}>
        Back
      </CmTypography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    gap: 5,
  },
  backButtonText: {
    color: '#07373B',
    textTransform: 'none',
    letterSpacing: 0,
  },
});

export default BackButton;
