import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CmTypography } from '@shared/components';
import PersonalValueIcon from 'src/components/PersonalValueIcon';
import Card from './Card';

interface Props {
  nr: number;
  value: {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
  };
}

function PersonalValueCard({ nr, value }: Props) {
  const [expanded, setExpanded] = useState(false);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Card style={{ padding: 10 }}>
      <CmTypography variant="label">NO.{nr.toString()}</CmTypography>
      <CmTypography variant="h4" style={{ textAlign: 'left', fontSize: 18, paddingTop: 4 }}>
        {capitalizeFirstLetter(value.name)}
      </CmTypography>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <PersonalValueIcon valueName={value.name} style={styles.image} />
      </View>

      <CmTypography variant="body" style={{ marginVertical: 10 }}>
        {value.shortDescription}
      </CmTypography>

      {expanded && (
        <CmTypography variant="body">{value.description}</CmTypography>
      )}

      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        style={{ marginTop: 20 }}
      >
        {!expanded && (
          <CmTypography variant="button" style={styles.moreLessButton}>
            MORE
          </CmTypography>
        )}
        {expanded && (
          <CmTypography variant="button" style={styles.moreLessButton}>
            LESS
          </CmTypography>
        )}
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
