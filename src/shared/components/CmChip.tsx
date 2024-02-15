import { StyleSheet, View, Text, Pressable } from 'react-native';

import CmTypography from './CmTypography';
import { useState } from 'react';

interface Props {
  label: string;
  personalValueText: {};
}

// get real descriptions for types
const personalValueText = {
  benevolence: "It's very important to them to help the people around them. They want to care for the well-being of those around them.",
  hedonism: 'They seek every chance they can to have fun. It is important to them to do things that give them pleasure.',
  security: 'It is important to them that things be organized and clean. They really do not like things to be a mess.',
  tradition: 'Religious belief or traditions are important to them. They try hard to do what their religion or family traditions require.',
  universalism: 'They think it is important that every person in the world be treated equally. They believe everyone should have equal opportunities in life.',
  'self-direction': "They think it's important to be interested in things. They like to be curious and to try to understand all sorts of things.",
  conformity: 'They believe they should always show respect to their parents and to older people. It is important to them to be obedient.',
  stimulation: 'They like to take risks. They are always looking for adventures.',
  achievement: 'Being very successful is important to them. They like to impress other people.',
  power: 'It is important to them to be in charge and tell others what to do. They want people to do what they say.',
};

function CmChip({ label }: Props) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      {tooltip && (
        <View style={styles.tooltip}>
          {/* <CmTypography variant="h1" style={styles.tooltipText}>
            {label}
          </CmTypography> */}
          <CmTypography variant="body" style={styles.tooltipText}>
            {personalValueText[label]}
          </CmTypography>
          <View style={styles.caretDown}></View>
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
    width: 100,
    height: 200,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(8, 55, 59)',
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: -50 }],
    minWidth: 150,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    zIndex: 10000,
    marginBottom:15
  },
  tooltipText: {
    justifyContent: 'center',
    color: 'black',
    fontSize: 14,
  },
  caretDown: {
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
    borderTopWidth: 0,
    borderLeftWidth: 0,
    position: 'absolute',
    bottom: '-6%',
    left: '50%',
  },
});

export default CmChip;
