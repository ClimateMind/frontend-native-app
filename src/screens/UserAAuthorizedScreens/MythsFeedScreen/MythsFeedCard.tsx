import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Myth from "src/types/Myth";
import LabelText from "src/components/TextStyles/LabelText";
import BodyText from "src/components/TextStyles/BodyText";
import ButtonText from "src/components/TextStyles/ButtonText";
import Card from "src/components/Cards/Card";

interface Props {
  myth: Myth;
  onLearnMore: ((myth: Myth) => void) | null;
}

function MythsFeedCard({ myth, onLearnMore }: Props) {
  return (
    <Card style={{ padding: 20 }}>

      <MaterialCommunityIcons style={styles.image} name="chat-alert" size={28} color="black" />
      <LabelText style={{ color: '#B00620', marginTop: 10 }}>MYTH</LabelText>
      <BodyText style={{ color: '#B00620', letterSpacing: 1.3, fontStyle: 'italic' }}>{myth.mythTitle}</BodyText>
      <LabelText style={{ color: '#00A85F', marginTop: 40 }}>TRUTH</LabelText>
      <BodyText style={{ color: '#00A85F', letterSpacing: 1.3 }}>{myth.mythRebuttal}</BodyText>

      {onLearnMore !== null && <Pressable onPress={() => onLearnMore(myth)}>
        <ButtonText style={styles.button}>WHY?</ButtonText>
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
