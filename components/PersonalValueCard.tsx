import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PersonalValueIcon from "./PersonalValueIcon";
import Card_Shadow from "../shadow-presets/Card_Shadow";

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
    <Card_Shadow>
    <View style={styles.card}>

      <Text style={[styles.boldText, { fontSize: 12 }]}>NO.{nr}</Text>
      <Text style={[styles.boldText, { fontSize: 20 }]}>{capitalizeFirstLetter(value.name)}</Text>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <PersonalValueIcon valueName={value.name} style={styles.image} />
      </View>
      
      <Text style={[styles.boldText, { marginTop: 10, marginBottom: 10 }]}>{value.shortDescription}</Text>

      {expanded && <Text style={styles.boldText}>{value.description}</Text>}

      <Pressable onPress={() => setExpanded(prev => !prev)} style={{ marginTop: 20 }}>
        {!expanded && <Text style={styles.boldText}>MORE</Text>}
        {expanded && <Text style={styles.boldText}>LESS</Text>}
      </Pressable>
      
    </View>
    </Card_Shadow>
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
