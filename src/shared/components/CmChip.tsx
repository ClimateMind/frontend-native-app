import { StyleSheet, View, Text, Pressable } from 'react-native';

import CmTypography from './CmTypography';
import { useState } from 'react';

interface Props {
  label: string;
  personalValueTypes:{}
}

const personalValueTypes = {
  'benevolence':'adasdfasdasdasdas',

}

function CmChip({ label }: Props) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      {tooltip && (
        <View style={styles.tooltip}>
          <CmTypography variant="body" style={styles.tooltipText}>
          {personalValueTypes[label]}
          </CmTypography>
        </View>
      )}
      <Pressable onTouchStart={() => setTooltip(true)} onTouchEnd={() => setTooltip(false)}>
        <CmTypography variant="body" style={styles.chip}>
          {label}
        </CmTypography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: -50 }],
    minWidth: 150,
    zIndex:10000 
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CmChip;
