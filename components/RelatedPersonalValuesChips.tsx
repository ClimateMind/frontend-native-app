import { StyleSheet, Text, View } from "react-native";

interface Props {
  relatedPersonalValues: string[];
}

function RelatedPersonalValuesChips({ relatedPersonalValues }: Props) {
  return (
    <View style={styles.chipsContainer}>
      {relatedPersonalValues.map(value => (
        <Text key={value} style={styles.chip}>{value}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  chip: {
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
});

export default RelatedPersonalValuesChips;
