import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Myth from 'src/types/Myth';
import { CmTypography } from '@shared/CmTypography/components';
import Card from 'src/components/Cards/Card';

interface Props {
  myth: Myth;
  onLearnMore: ((myth: Myth) => void) | null;
}

function MythsFeedCard({ myth, onLearnMore }: Props) {
  return (
    <Card style={{ padding: 20 }}>

      <MaterialCommunityIcons style={styles.image} name="chat-alert" size={28} color="black" />
      <CmTypography variant='label' style={{ color: '#B00620', marginTop: 10 }}>MYTH</CmTypography>
      <CmTypography variant='body' style={{ color: '#B00620', letterSpacing: 1.3, fontStyle: 'italic' }}>{myth.mythTitle}</CmTypography>
      <CmTypography variant='label' style={{ color: '#00A85F', marginTop: 40 }}>TRUTH</CmTypography>
      <CmTypography variant='body' style={{ color: '#00A85F', letterSpacing: 1.3 }}>{myth.mythRebuttal}</CmTypography>

      {onLearnMore !== null && <Pressable onPress={() => onLearnMore(myth)}>
        <CmTypography variant='button' style={styles.button}>WHY?</CmTypography>
      </Pressable>}

    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'flex-end',
  },
  button: {
    marginTop: 60,
    letterSpacing: 0.8,
    textAlign: 'left',
  },
});

export default MythsFeedCard;
