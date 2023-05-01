import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { WEB_URL } from '@env';

import { GetAllConversations } from '../../../api/responses';

interface Props {
  conversation: GetAllConversations;
}

function ConversationCard({ conversation }: Props) {
  const [expanded, setExpanded] = useState(false);
  
  function copyLink() {
    Clipboard.setStringAsync(WEB_URL + '/landing/' + conversation.conversationId);
  }

  function deleteConversation() {
    
  }
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Invited User to talk</Text>
        {expanded && <Pressable onPress={copyLink}><Text>COPY LINK</Text></Pressable>}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{conversation.userB.name}</Text>
        {expanded && <Pressable>
          <MaterialIcons name="edit" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </Pressable>}
      </View>
      
      {expanded && <>
        <Text style={styles.text}>When {conversation.userB.name} is finished, we will send you an email and their results will appear here. Then you can start preparing for your chat!</Text>
        <Text style={styles.text}>If you need to resend test their link, you can access it by clicking “COPY LINK”.</Text>
      </>}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center' }}>
        {expanded ? <Pressable onPress={deleteConversation}><Feather name="trash" size={24} color="black" /></Pressable> : <View></View>}
        <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
          <Text style={{ letterSpacing: 1, fontWeight: 'bold' }}>{expanded ? 'LESS' : 'MORE'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    letterSpacing: 1,
    marginVertical: 5,
  },
  moreLessButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 10,
  },
});

export default ConversationCard;
