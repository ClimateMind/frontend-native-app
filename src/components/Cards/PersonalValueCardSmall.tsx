import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { capitalize } from "lodash";

import { CmTypography } from "src/components";
import PersonalValueIcon from "src/components/PersonalValueIcon";
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
          <CmTypography variant='h3'>{capitalize(name)}</CmTypography>
          <CmTypography variant='h3'>{percentage.toString()}% match</CmTypography>
        </View>

        <Pressable onPress={() => setExpanded(prev => !prev)} style={{ width: 70 }}>
          <CmTypography variant='button' style={styles.moreCloseText}>{expanded ? "CLOSE" : "MORE"}</CmTypography>
        </Pressable>
      </View>

      {expanded && <CmTypography variant='body' style={styles.shortDescription}>{shortDescription}</CmTypography>}

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
