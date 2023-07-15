import { Pressable, StyleSheet, Text, View } from "react-native";
import PersonalValueIcon from "./PersonalValueIcon";
import { capitalizeFirstLetter } from "../utils";
import { useState } from "react";
import Card_Shadow from "../shadow-presets/Card_Shadow";

interface Props {
  name: string;
  shortDescription: string;
  percentage: number;
}

function PersonalValueCardSmall({ name, shortDescription, percentage }: Props) {
  const [expanded, setExpanded] = useState(false);
  
  return (
  <Card_Shadow>
    <View style={styles.card}>
      <View style={styles.header}>
        <PersonalValueIcon valueName={name} style={styles.image} />

        <View>
          <Text style={styles.headerText}>{capitalizeFirstLetter(name)}</Text>
          <Text style={styles.headerText}>{percentage}% match</Text>
        </View>

        <Pressable onPress={() => setExpanded(prev => !prev)} style={{ width: 60 }}>
          <Text style={styles.moreCloseText}>{expanded ? "CLOSE" : "MORE"}</Text>
        </Pressable>
      </View>

      {expanded && <Text style={styles.shortDescription}>{shortDescription}</Text>}
    </View>
    </Card_Shadow>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  
  },
  image: {
    resizeMode: 'contain',
    width: 90,
    height: 90,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  moreCloseText: {
    fontWeight: 'bold',
    letterSpacing: 1.1,
    fontSize: 14,
  },
  shortDescription: {
    fontWeight: 'bold',
    marginTop: 10,
  }
});

export default PersonalValueCardSmall;
