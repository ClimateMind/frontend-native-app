import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Headline4 from '../../../components/TextStyles/Headline4';
import BodyText from '../../../components/TextStyles/BodyText';
import Card from '../../../components/Cards/Card';

function ConversationsIntroCard() {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <Card style={{ padding: 15 }}>

      <Headline4 style={{ marginBottom: 10 }}>How to talk about Climate Change</Headline4>

      {expanded && <>
        <Headline4 style={styles.subtitle}>Step 1: Bond</Headline4>
        <BodyText style={styles.text}>Start your conversation by bonding over similar personal values and interests.</BodyText>
        <BodyText style={styles.text}>Climate Mind helps with this by giving you a special link to the values questionnaire to share with others before you chat.</BodyText>

        <Headline4 style={styles.subtitle}>Step 2: Relate</Headline4>
        <BodyText style={styles.text}>Connect the dots for others on how your shared values relate to climate change.</BodyText>
        
        <Headline4 style={styles.subtitle}>Step 3: Inspire</Headline4>
        <BodyText style={styles.text}>Motivate the other person with solutions they find attractive.</BodyText>
      </>}

      <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
        <BodyText style={{ letterSpacing: 1, fontWeight: 'bold' }}>{expanded ? 'LESS' : 'MORE'}</BodyText>
      </Pressable>

    </Card>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    paddingVertical: 10,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 1,
    paddingVertical: 5,
    fontSize: 14,
  },
  moreLessButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 10,
  },
});

export default ConversationsIntroCard;
