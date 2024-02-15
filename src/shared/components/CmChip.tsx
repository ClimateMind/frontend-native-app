import { StyleSheet, View, Text, Pressable } from 'react-native';

import CmTypography from './CmTypography';
import { useState } from 'react';

interface Props {
  label: string;
  personalValueText: {};
}

// get real descriptions for types
const personalValueText = {
  benevolence: "Forgiving, helping, and being loyal are important to you. You likely look to preserve and improve the lives of those that share your core interests or identities.",
  hedonism: 'Joy, pleasure and satisfaction are a big part of what drives you. From big moments to the little things, you find bliss in enjoying what you do.',
  security: 'A feeling of safety, stability, and order is very important to you; this is true likely whether in society at large, at work, in your home, or in your relationships.',
  tradition: 'You value protecting the traditions of your family, community, and/or culture. You likely take pride in this commitment.',
  universalism: 'You care a great deal for the well-being of all people and life. You likely also value diversity and protecting the environment.',
  'self-direction': "You value freedom of thought and action, preferring to come to conclusions or decisions yourself. You also likely draw great satisfaction when creating or exploring the world.",
  conformity: 'Rule breaker? Far from it. In fact, you love nothing more than sticking by the rules and conforming to social norms.',
  stimulation: 'You highly value excitement, challenge, and positive change. Life is likely never dull with you around.',
  achievement: 'Success - that’s a major goal for your life. Meeting your own standards of excellence is very important to you. It propels you forward.',
  power: 'Control freak? Maybe. But in your eyes it’s more about embracing power, holding dominance and getting the job done. You value social status and prestige.',
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
    height: 220,
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
    bottom: '-5.5%',
    left: '50%',
  },
});

export default CmChip;
