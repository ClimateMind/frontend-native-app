import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Headline4 from "src/components/TextStyles/Headline4";
import BodyText from "src/components/TextStyles/BodyText";
import LabelText from "src/components/TextStyles/LabelText";
import ButtonText from "src/components/TextStyles/ButtonText";
import PersonalValueIcon from "src/components/PersonalValueIcon";
import Card from "./Card";


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
    <Card style={{ padding: 10 }}>

      <LabelText>NO.{nr.toString()}</LabelText>
      <Headline4 style={{ textAlign: 'left', fontSize: 18, paddingTop: 4 }}>{capitalizeFirstLetter(value.name)}</Headline4>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <PersonalValueIcon valueName={value.name} style={styles.image} />
      </View>
      
      <BodyText style={{ marginVertical: 10 }}>{value.shortDescription}</BodyText>

      {expanded && <BodyText>{value.description}</BodyText>}

      <Pressable onPress={() => setExpanded(prev => !prev)} style={{ marginTop: 20 }}>
        {!expanded && <ButtonText style={styles.moreLessButton}>MORE</ButtonText>}
        {expanded && <ButtonText style={styles.moreLessButton}>LESS</ButtonText>}
      </Pressable>
      
    </Card>
  );
}

const styles = StyleSheet.create({
  moreLessButton: {
    textAlign: 'left',
    paddingVertical: 8,
  },
  image: {
    marginVertical: 10,
  },
});

export default PersonalValueCard;
