import { StyleSheet } from 'react-native';

import BodyText from 'src/components/TextStyles/BodyText';

interface Props {
  label: string;
}

function CmChip({ label }: Props) {
  return <BodyText style={styles.chip}>{label}</BodyText>;
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
});

export default CmChip;
