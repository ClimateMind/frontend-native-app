import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import PageTitle from '../../../components/PageTitle';
import ConversationsIntroCard from './ConversationsIntroCard';
import ConversationCard from './ConversationCard';
import { GetAllConversations } from '../../../api/responses';
import useApiClient from '../../../hooks/useApiClient';
import Colors from '../../../assets/colors';

interface Props {
  open: boolean;
  onClose: () => void;
}

function ConversationsDrawer({ open, onClose }: Props) {
  const apiClient = useApiClient();
  const [allConversations, setAllConversations] = useState<GetAllConversations[]>([]);
  
  function onDeleteConversation(conversationId: string) {
    setAllConversations(current => current.filter(conversation => conversation.conversationId !== conversationId));
  }
  
  useEffect(() => {
    apiClient.getAllConversations()
      .then((result) => setAllConversations(result.conversations));
  }, [open]);

  return (
    <Modal
      visible={open}
      animationType="slide"
    >
      <View style={styles.container}>
        <Pressable onPress={onClose} style={{ height: 100, alignItems: "center" }}>
          <AntDesign name="down" size={24} color="black" style={{ padding: 20 }} />
        </Pressable>
        <View style={{ marginBottom: 20 }}>
          <PageTitle>Ongoing Conversations</PageTitle>
        </View>

        {allConversations === undefined && <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} />}
        <View>
        {allConversations && (
          <FlatList
            ListHeaderComponent={
              <View style={{ margin: 10 }}>
                <ConversationsIntroCard />
              </View>
            }
            data={allConversations}
            renderItem={(item) => <View style={{ margin: 10 }}><ConversationCard conversation={item.item} onDelete={onDeleteConversation} /></View>}
            keyExtractor={(item) => item.conversationId}
            style={{ marginBottom: 30 }}
          />
        )}
        </View>
      </View>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeBright,
    flex: 1,
    paddingBottom: 140,
    paddingTop: 10,
  },
});

export default ConversationsDrawer;
