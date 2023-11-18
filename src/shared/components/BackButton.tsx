import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CmTypography from './CmTypography';



interface Props {
  onPress: () => void;
}

function BackButton({ onPress }: Props) {
  return (
    <Pressable style={styles.backButtonContainer} onPress={onPress}>
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
    marginVertical: 20,
  },
  backButtonText: {
    marginLeft: 10,
  },
});

export default BackButton;
