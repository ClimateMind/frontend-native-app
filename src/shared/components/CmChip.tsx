import { StyleSheet, View, Pressable, Text } from 'react-native';

import CmTypography from './CmTypography';
import { useState } from 'react';

interface Props {
  label: string;
}

// const personalValueText: { [x: string]: string } = {
//   benevolence: 'Forgiving, helping, and being loyal are important to you. You likely look to preserve and improve the lives of those that share your core interests or identities.',
//   hedonism: 'Joy, pleasure and satisfaction are a big part of what drives you. From big moments to the little things, you find bliss in enjoying what you do.',
//   security: 'A feeling of safety, stability, and order is very important to you; this is true likely whether in society at large, at work, in your home, or in your relationships.',
//   tradition: 'You value protecting the traditions of your family, community, and/or culture. You likely take pride in this commitment.',
//   universalism: 'You care a great deal for the well-being of all people and life. You likely also value diversity and protecting the environment.',
//   'self-direction': 'You value freedom of thought and action, preferring to come to conclusions or decisions yourself. You also likely draw great satisfaction when creating or exploring the world.',
//   conformity: 'Rule breaker? Far from it. In fact, you love nothing more than sticking by the rules and conforming to social norms.',
//   stimulation: 'You highly value excitement, challenge, and positive change. Life is likely never dull with you around.',
//   achievement: 'Success - that’s a major goal for your life. Meeting your own standards of excellence is very important to you. It propels you forward.',
//   power: 'Control freak? Maybe. But in your eyes it’s more about embracing power, holding dominance and getting the job done. You value social status and prestige.',
// };

const personalValueText: { [x: string]: string } = {
  benevolence: 'To value: Forgiving, helping, and being loyal, preserving and improving the lives of people that share core interests or identities.',
  hedonism: 'To value: Joy, pleasure, and satisfaction, enjoying oneself.',
  security: 'To value: A feeling of safety, stability, and order in society, at work, in home, and in relationships.',
  tradition: 'To value: Protecting the traditions of family, community, and/or culture.',
  universalism: 'To value: Caring for the well-being of all people and life, likely also diversity and protecting the environment.',
  'self-direction': 'To value: Freedom of thought and action, preferring to come to conclusions or decisions independently, satisfaction when creating or exploring the world.',
  conformity: 'To value: Sticking by the rules and conforming to social norms.',
  stimulation: 'To value: Excitement, challenge, and change.',
  achievement: 'To value: Success, meeting standards of excellence.',
  power: 'To value: Embracing power, holding dominance, social status and prestige.',
 };

function CmChip({ label }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      {showTooltip && (
        <View style={styles.tooltip}>
          <CmTypography variant="h1" style={styles.tooltipText}>
            {label[0].toUpperCase() + label.slice(1)}
          </CmTypography>
       <CmTypography variant={'body'}>{personalValueText[label]}</CmTypography>
          <View style={styles.caretDown}></View>
        </View>
      )}

      <Pressable onTouchStart={() => setShowTooltip(true)} onTouchEnd={() => setShowTooltip(false)}>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(8, 55, 59)',
    bottom: '100%',
    left: '45%',
    transform: [{ translateX: -50 }],
    minWidth: 120,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    zIndex: 100000,
    marginBottom: 15,
  },
  tooltipText: {
    
    textAlign: 'justify',
    // color: 'black',
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
    bottom: -10,
    left: '45%',
  },
});

export default CmChip;
