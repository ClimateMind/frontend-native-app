import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { WEB_URL } from '@env';

import { GetAllConversations } from '../../../api/responses';
import useApiClient from '../../../hooks/useApiClient';
import DeleteConversationModal from './DeleteConversationModal';
import SeeHowYouAlignButton from './SeeHowYouAlignButton';
import ViewSelectedTopicsButton from './ViewSelectedTopicsButton';
import YesWeTalkedButton from './YesWeTalkedButton';
import ConversationRating from './ConversationRating';
import SeeHowYouAlignModal from './SeeHowYouAlignModal';
import ViewSelectedTopicsModal from './ViewSelectedTopicsModal';
import CaptionText from '../../../components/TextStyles/CaptionText';
import ButtonText from '../../../components/TextStyles/ButtonText';
import Headline3 from '../../../components/TextStyles/Headline3';
import BodyText from '../../../components/TextStyles/BodyText';
import Headline4 from '../../../components/TextStyles/Headline4';

interface Props {
  conversation: GetAllConversations;
  onDelete: (conversationId: string) => void;
}

function ConversationCard({ conversation, onDelete }: Props) {
  const apiClient = useApiClient();
  
  const [expanded, setExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [conversationState, setConversationState] = useState(conversation.state);
  
  const [showSeeHowYouAlignModal, setShowSeeHowYouAlignModal] = useState(false);
  const [showViewSelectedTopicsModal, setShowViewSelectedTopicsModal] = useState(false);
  
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

  function increaseState(state: number) {
    if (state > conversationState) {
      setConversationState(state);
    }

    if (state === 2) {
      setShowSeeHowYouAlignModal(true);
    } else if (state === 3) {
      setShowViewSelectedTopicsModal(true);
    }
  }
  
  useEffect(() => {
    setConversationState(conversation.state);
  }, [conversation.state]);

  return (
      <View style={[styles.container, { backgroundColor: conversationState === 5 ? '#BDFADC' : 'white' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CaptionText>{headerText[conversationState]}</CaptionText>
          {expanded && <Pressable onPress={copyLink}><Text>COPY LINK</Text></Pressable>}
        </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: expanded ? 20 : 0}}>
        <Headline3 style={{ marginBottom: 5 }}>{conversation.userB.name}</Headline3>
        {expanded && <Pressable>
          <MaterialIcons name="edit" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </Pressable>}
      </View>
      
      {/* For state 0, display a text that the userB has to take the quiz */}
      {expanded && conversationState === 0 && <>
        <BodyText style={styles.text}>When {conversation.userB.name} is finished, we will send you an email and their results will appear here. Then you can start preparing for your chat!</BodyText>
        <BodyText style={styles.text}>If you need to resend test their link, you can access it by clicking “COPY LINK”.</BodyText>
      </>}

      {/* For every other state, show the text and buttons the userA needs */}
      { expanded && conversationState !== 0 && <>
        <Headline4 style={styles.subheading}>1. {conversation.userB.name} took the values quiz</Headline4>
        <SeeHowYouAlignButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(2)} />
        
        <Headline4 style={styles.subheading}>2. See what you can discuss with {conversation.userB.name}</Headline4>
        <ViewSelectedTopicsButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(3)} />

        <Headline4 style={styles.subheading}>3. Have you had your conversation with {conversation.userB.name}?</Headline4>
        {conversationState <= 3 && <YesWeTalkedButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(4)} />}
        {conversationState > 3 && <ConversationRating conversationId={conversation.conversationId} initialRating={conversation.userARating} />}
      </>
      }
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        {expanded ? <Pressable onPress={() => setShowDeleteModal(true)} style={styles.deleteButton}><Foundation name="trash" size={24} color="#77AAAF" /></Pressable> : <View></View>}
        <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
          <ButtonText style={{ letterSpacing: 1, paddingVertical: 3 }}>{expanded ? 'LESS' : 'MORE'}</ButtonText>
        </Pressable>
      </View>

      <SeeHowYouAlignModal conversation={conversation} open={showSeeHowYouAlignModal} onClose={() => setShowSeeHowYouAlignModal(false)} onViewTopics={() => {setShowSeeHowYouAlignModal(false); setShowViewSelectedTopicsModal(true);}} />
      <ViewSelectedTopicsModal conversation={conversation} open={showViewSelectedTopicsModal} onClose={() => setShowViewSelectedTopicsModal(false)} />

      <DeleteConversationModal show={showDeleteModal} userBName={userBName} onCancel={() => setShowDeleteModal(false)} onConfirm={deleteConversation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    marginVertical: 5,
  },
  subheading: {
    fontWeight: 'bold',
    textAlign: 'left',
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
  whiteButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});

export default ConversationCard;
