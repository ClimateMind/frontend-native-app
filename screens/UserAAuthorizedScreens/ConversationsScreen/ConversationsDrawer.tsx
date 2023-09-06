import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ConversationsIntroCard from './ConversationsIntroCard';
import ConversationCard from './ConversationCard';
import { GetAllConversations } from '../../../api/responses';
import useApiClient from '../../../hooks/useApiClient';
import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';
import Headline2 from '../../../components/TextStyles/Headline2';

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
      onRequestClose={onClose}
    >
      <Screen view='View'>
        <Section>
          <Content style={{ alignItems: 'stretch', width: '100%' }}>
            <Pressable onPress={onClose} style={{ height: 100, alignItems: "center", paddingTop: 20 }}>
              <AntDesign name="down" size={24} color="black" style={{ padding: 20 }} />
            </Pressable>
            <View style={{ marginBottom: 20 }}>
              <Headline2>Ongoing Conversations</Headline2>
            </View>

            {allConversations === undefined && <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} />}
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
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            )}
          </Content>
        </Section>
      </Screen>
      
    </Modal>
  );
}

export default ConversationsDrawer;
