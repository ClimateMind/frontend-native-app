import { StyleSheet, View } from 'react-native';
import CmTypography from './CmTypography';

interface Props {
  label: string;
}

function CmChip({ label }: Props) {
  return (
    <View style={{ position: 'relative', borderRadius: 50 }}>
      <CmTypography variant="body" style={[styles.chip, { overflow: 'hidden' }]}>
        {label}
      </CmTypography>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 25,
    margin: 5,
  },
});

export default CmChip;
