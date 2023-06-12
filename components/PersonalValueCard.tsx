import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  nr: number;
  value: {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
  }
}

function PersonalValueCard({ nr, value }: Props) {
  const [expanded, setExpanded] = useState(false);
  
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.card}>

      <Text style={[styles.boldText, { fontSize: 12 }]}>NO.{nr}</Text>
      <Text style={[styles.boldText, { fontSize: 20 }]}>{capitalizeFirstLetter(value.name)}</Text>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      { value.name === 'achievement' && <Image style={styles.image} source={require('../assets/personal-values/achievement_icon.png')} />}
      { value.name === 'benevolence' && <Image style={styles.image} source={require('../assets/personal-values/benevolence_icon.png')} />}
      { value.name === 'conformity' && <Image style={styles.image} source={require('../assets/personal-values/conformity_icon.png')} />}
      { value.name === 'hedonism' && <Image style={styles.image} source={require('../assets/personal-values/hedonism_icon.png')} />}
      { value.name === 'power' && <Image style={styles.image} source={require('../assets/personal-values/power_icon.png')} />}
      { value.name === 'security' && <Image style={styles.image} source={require('../assets/personal-values/security_icon.png')} />}
      { value.name === 'self direction' && <Image style={styles.image} source={require('../assets/personal-values/self_direction_icon.png')} />}
      { value.name === 'stimulation' && <Image style={styles.image} source={require('../assets/personal-values/stimulation_icon.png')} />}
      { value.name === 'tradition' && <Image style={styles.image} source={require('../assets/personal-values/tradition_icon.png')} />}
      { value.name === 'universalism' && <Image style={styles.image} source={require('../assets/personal-values/universalism_icon.png')} />}
      </View>
      
      <Text style={[styles.boldText, { marginTop: 10, marginBottom: 10 }]}>{value.shortDescription}</Text>

      {expanded && <Text style={styles.boldText}>{value.description}</Text>}

      <Pressable onPress={() => setExpanded(prev => !prev)} style={{ marginTop: 20 }}>
        {!expanded && <Text style={styles.boldText}>MORE</Text>}
        {expanded && <Text style={styles.boldText}>LESS</Text>}
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  image: {
    marginVertical: 10,
  },
});

export default PersonalValueCard;
