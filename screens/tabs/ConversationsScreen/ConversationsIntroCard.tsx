import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Card_Shadow from '../../../ShadowStyles/Card_Shadow';
function ConversationsIntroCard() {
  const [expanded, setExpanded] = useState(true);
  
  return (
<Card_Shadow>
    <View style={styles.container}>
      <Text style={styles.title}>How to talk about Climate Change</Text>

      {expanded && <>
        <Text style={styles.subtitle}>Step 1: Bond</Text>
        <Text style={styles.text}>Start your conversation by bonding over similar personal values and interests.</Text>
        <Text style={styles.text}>Climate Mind helps with this by giving you a special link to the values questionnaire to share with others before you chat.</Text>

        <Text style={styles.subtitle}>Step 2: Relate</Text>
        <Text style={styles.text}>Connect the dots for others on how your shared values relate to climate change.</Text>
        
        <Text style={styles.subtitle}>Step 3: Inspire</Text>
        <Text style={styles.text}>Motivate the other person with solutions they find attractive.</Text>
      </>}

      <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
        <Text style={{ letterSpacing: 1, fontWeight: 'bold' }}>{expanded ? 'LESS' : 'MORE'}</Text>
      </Pressable>
    </View>
    </Card_Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 10,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 1,
    paddingVertical: 5,
  },
  moreLessButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 10,
  },
});

export default ConversationsIntroCard;
