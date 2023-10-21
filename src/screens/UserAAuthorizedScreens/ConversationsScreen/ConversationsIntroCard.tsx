import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { CmTypography } from 'src/components';
import Card from 'src/components/Cards/Card';

function ConversationsIntroCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card style={{ padding: 15 }}>
      <CmTypography variant='h4' style={{ marginBottom: 10 }}>How to talk about Climate Change</CmTypography>

      {expanded && <>
        <CmTypography variant='h4' style={styles.subtitle}>Step 1: Bond</CmTypography>
        <CmTypography variant='body' style={styles.text}>Start your conversation by bonding over similar personal values and interests.</CmTypography>
        <CmTypography variant='body' style={styles.text}>Climate Mind helps with this by giving you a special link to the values questionnaire to share with others before you chat.</CmTypography>

        <CmTypography variant='h4' style={styles.subtitle}>Step 2: Relate</CmTypography>
        <CmTypography variant='body' style={styles.text}>Connect the dots for others on how your shared values relate to climate change.</CmTypography>
        
        <CmTypography variant='h4' style={styles.subtitle}>Step 3: Inspire</CmTypography>
        <CmTypography variant='body' style={styles.text}>Motivate the other person with solutions they find attractive.</CmTypography>
      </>}

      <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
        <CmTypography variant='button' style={{ letterSpacing: 1 }}>{expanded ? 'LESS' : 'MORE'}</CmTypography>
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
