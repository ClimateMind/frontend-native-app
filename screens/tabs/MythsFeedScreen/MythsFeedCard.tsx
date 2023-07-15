import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Myth from "../../../types/Myth";
import Card_Shadow from "../../../shadow-presets/Card_Shadow";

interface Props {
  myth: Myth;
  onLearnMore: ((myth: Myth) => void) | null;
}

function MythsFeedCard({ myth, onLearnMore }: Props) {
  return (
    <Card_Shadow>
    <View style={styles.card}>
      <Ionicons style={styles.image} name="chatbox-ellipses-sharp" size={24} color="black" />
      <Text style={[styles.smallText, { color: '#B00620' }]}>MYTH</Text>
      <Text style={[styles.largeText, { color: '#B00620' }]}>{myth.mythTitle}</Text>
      <Text style={[styles.smallText, { color: '#00A85F' }]}>TRUTH</Text>
      <Text style={[styles.largeText, { color: '#00A85F' }]}>{myth.mythRebuttal}</Text>

      {onLearnMore !== null && <Pressable onPress={() => onLearnMore(myth)}>
        <Text style={styles.button}>WHY?</Text>
      </Pressable>}
      
    </View>
    </Card_Shadow>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  image: {
    alignSelf: 'flex-end',
  },
  smallText: {
    letterSpacing: 1,
    fontSize: 10,
    marginTop: 30,
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 50,
  },
});

export default MythsFeedCard;
