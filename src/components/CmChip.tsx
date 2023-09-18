import { StyleSheet } from 'react-native';

import { CmTypography } from '.';

interface Props {
  label: string;
}

function CmChip({ label }: Props) {
  return <CmTypography variant='body' style={styles.chip}>{label}</CmTypography>;
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
