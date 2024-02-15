import { StyleSheet, View, Text, Pressable } from 'react-native';

import CmTypography from './CmTypography';
import { useState } from 'react';

interface Props {
  label: string;
  personalValueText: {};
}


// get real descriptions for types
const personalValueText = {
  benevolence: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ea obcaecati distinctio reiciendis debitis autem cumque modi ratione doloremque corrupti, perspiciatis molestias excepturi, dolorum reprehenderit pariatur at voluptatum ipsum laborum.',
  hedonism: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ea obcaecati distinctio reiciendis debitis autem cumque modi ratione doloremque corrupti, perspiciatis molestias excepturi, dolorum reprehenderit pariatur at voluptatum ipsum laborum.',
  security: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ea obcaecati distinctio reiciendis debitis autem cumque modi ratione doloremque corrupti, perspiciatis molestias excepturi, dolorum reprehenderit pariatur at voluptatum ipsum laborum.',
  tradition: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ea obcaecati distinctio reiciendis debitis autem cumque modi ratione doloremque corrupti, perspiciatis molestias excepturi, dolorum reprehenderit pariatur at voluptatum ipsum laborum.',
  universalism: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ea obcaecati distinctio reiciendis debitis autem cumque modi ratione doloremque corrupti, perspiciatis molestias excepturi, dolorum reprehenderit pariatur at voluptatum ipsum laborum.',
  security: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ea obcaecati distinctio reiciendis debitis autem cumque modi ratione doloremque corrupti, perspiciatis molestias excepturi, dolorum reprehenderit pariatur at voluptatum ipsum laborum.',


};

function CmChip({ label }: Props) {
  const [tooltip, setTooltip] = useState(false);

  return (
  
    <View style={{ position: 'relative' }}>
      {tooltip && (
        <View style={styles.tooltip}>
           <CmTypography variant="h1" style={styles.tooltipText}>
            {label}
          </CmTypography>
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
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 8,
    borderRadius: 4,
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
  },
  tooltipText: {
    color: 'black',
    fontSize: 14,
  },
  caretDown: {
    position:'absolute',
   backgroundColor: 'white',
   borderWidth:1,
   width:20,
   height:20,
   transform: [{ rotate: '45deg'}],
   bottom:'-3%',
   left: '40%',
   borderTopWidth:0,
   borderLeftWidth:0
   

   
  },
});

export default CmChip;
