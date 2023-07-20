import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { capitalizeFirstLetter } from "../../utils";

import Headline3 from "../TextStyles/Headline3";
import ButtonText from "../TextStyles/ButtonText";
import BodyText from "../TextStyles/BodyText";
import PersonalValueIcon from "../PersonalValueIcon";
import Card from "./Card";

interface Props {
  name: string;
  shortDescription: string;
  percentage: number;
}

function PersonalValueCardSmall({ name, shortDescription, percentage }: Props) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card style={{ padding: 10 }}>

      <View style={styles.header}>
        <PersonalValueIcon valueName={name} style={styles.image} />

        <View>
          <Headline3>{capitalizeFirstLetter(name)}</Headline3>
          <Headline3>{percentage.toString()}% match</Headline3>
        </View>

        <Pressable onPress={() => setExpanded(prev => !prev)} style={{ width: 70 }}>
          <ButtonText style={styles.moreCloseText}>{expanded ? "CLOSE" : "MORE"}</ButtonText>
        </Pressable>
      </View>

      {expanded && <BodyText style={styles.shortDescription}>{shortDescription}</BodyText>}

    </Card>
  );
}

const styles = StyleSheet.create({
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
  moreCloseText: {
    paddingVertical: 8,
  },
  shortDescription: {
    padding: 20,
  },
});

export default PersonalValueCardSmall;
