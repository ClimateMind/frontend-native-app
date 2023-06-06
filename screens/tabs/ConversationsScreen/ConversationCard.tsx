import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { WEB_URL } from '@env';

import { GetAllConversations } from '../../../api/responses';
import useApiClient from '../../../hooks/useApiClient';
import DeleteConversationModal from './DeleteConversationModal';

interface Props {
  conversation: GetAllConversations;
  onDelete: (conversationId: string) => void;
}

function ConversationCard({ conversation, onDelete }: Props) {
  const apiClient = useApiClient();
  const [expanded, setExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const userBName = conversation.userB.name;
  const headerText = [
    `Invited ${userBName} to talk`,
    `Prepare to talk with ${userBName}`,
    `Prepare to talk with ${userBName}`,
    `Ready to talk with ${userBName}`,
    `Talked with ${userBName}`,
    `Talked with ${userBName}`,`Invited ${userBName} to talk`,
  ];
  
  function copyLink() {
    Clipboard.setStringAsync(WEB_URL + '/landing/' + conversation.conversationId);
  }

  function deleteConversation() {
    setShowDeleteModal(false)
    apiClient.deleteConversation(conversation.conversationId)
      .then(() => {
        onDelete(conversation.conversationId);
      })
      .catch(error => console.log(error));
  }
  
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{headerText[conversation.state]}</Text>
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
          {expanded ? <Pressable onPress={() => setShowDeleteModal(true)} style={styles.deleteButton}><Foundation name="trash" size={24} color="#77AAAF" /></Pressable> : <View></View>}
          <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
            <Text style={{ letterSpacing: 1, fontWeight: 'bold' }}>{expanded ? 'LESS' : 'MORE'}</Text>
          </Pressable>
        </View>
      </View>

      <DeleteConversationModal show={showDeleteModal} userBName={userBName} onCancel={() => setShowDeleteModal(false)} onConfirm={deleteConversation} />
    </>
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
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  moreLessButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 10,
  },
});

export default ConversationCard;
