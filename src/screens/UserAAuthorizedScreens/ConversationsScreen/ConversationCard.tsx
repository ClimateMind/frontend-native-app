import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import { GetAllConversations } from 'src/api/responses';
import useApiClient from 'src/hooks/useApiClient';
import DeleteConversationModal from './DeleteConversationModal';
import SeeHowYouAlignButton from './SeeHowYouAlignButton';
import ViewSelectedTopicsButton from './ViewSelectedTopicsButton';
import YesWeTalkedButton from './YesWeTalkedButton';
import ConversationRating from './ConversationRating';
import CopyLinkModal from './CopyLinkModal';
import SeeHowYouAlignModal from './SeeHowYouAlignModal';
import ViewSelectedTopicsModal from './ViewSelectedTopicsModal';
import { CmTypography } from 'src/components';
import Card from 'src/components/Cards/Card';
import NotifyIcon from './NotifyIcon';

interface Props {
  conversation: GetAllConversations;
  onDelete: (conversationId: string) => void;
}

function ConversationCard({ conversation, onDelete }: Props) {
  const apiClient = useApiClient();

  const [expanded, setExpanded] = useState(false);
  const [conversationState, setConversationState] = useState(conversation.state);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [conversationLink, setConversationLink] = useState('');
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [showSeeHowYouAlignModal, setShowSeeHowYouAlignModal] = useState(false);
  const [showViewSelectedTopicsModal, setShowViewSelectedTopicsModal] = useState(false);

  const userBName = conversation.userB.name;

  const headerText = [
    `Invited ${userBName} to talk`,
    `Prepare to talk with ${userBName}`,
    `Prepare to talk with ${userBName}`,
    `Ready to talk with ${userBName}`,
    `Talked with ${userBName}`,
    `Talked with ${userBName}`,
    `Invited ${userBName} to talk`,
  ];

  function copyLink() {
    setShowCopyLinkModal(true)
    setConversationLink(process.env.EXPO_PUBLIC_WEB_URL + '/landing/' + conversation.conversationId);
  }

  function deleteConversation() {
    setShowDeleteModal(false)
    apiClient.deleteConversation(conversation.conversationId)
      .then(() => {
        onDelete(conversation.conversationId);
      })
      .catch((error) => console.log(error));
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
    <>
      <Card style={[{ padding: 15 }, { backgroundColor: conversationState === 5 ? '#BDFADC' : 'white' }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CmTypography variant='caption'>{headerText[conversationState]}</CmTypography>
          {expanded && <Pressable onPress={copyLink}><Text>COPY LINK</Text></Pressable>}
          {!expanded &&  conversationState > 0 && conversationState < 5 && <NotifyIcon />}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: expanded ? 20 : 0 }}>
          <CmTypography variant='h3' style={{ marginBottom: 5 }}>{conversation.userB.name}</CmTypography>
          {expanded && <Pressable>
            {/* <MaterialIcons name="edit" size={24} color="black" style={{ marginHorizontal: 10 }} /> */}
          </Pressable>}
        </View>

        {/* For state 0, display a text that the userB has to take the quiz */}
        {expanded && conversationState === 0 && <>
          <CmTypography variant='body' style={styles.text}>When {conversation.userB.name} is finished, we will send you an email and their results will appear here. Then you can start preparing for your chat!</CmTypography>
          <CmTypography variant='body' style={styles.text}>If you need to resend test their link, you can access it by clicking “COPY LINK”.</CmTypography>
        </>}

        {/* For every other state, show the text and buttons the userA needs */}
        { expanded && conversationState !== 0 && <>
          <CmTypography variant='h4' style={styles.subheading}>1. {conversation.userB.name} took the values quiz</CmTypography>
          <SeeHowYouAlignButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(2)} />
          
          <CmTypography variant='h4' style={styles.subheading}>2. See what you can discuss with {conversation.userB.name}</CmTypography>
          <ViewSelectedTopicsButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(3)} />

          <CmTypography variant='h4' style={styles.subheading}>3. Have you had your conversation with {conversation.userB.name}?</CmTypography>
          {conversationState <= 3 && <YesWeTalkedButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(4)} />}
          {conversationState > 3 && <ConversationRating conversationId={conversation.conversationId} initialRating={conversation.userARating} onRated={() => setConversationState(5)} />}
        </>
        }
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          {expanded ? <Pressable onPress={() => setShowDeleteModal(true)} style={styles.deleteButton}><Foundation name="trash" size={24} color="#77AAAF" /></Pressable> : <View></View>}
          <Pressable onPress={() => setExpanded(current => !current)} style={styles.moreLessButton}>
            <CmTypography variant='button' style={{ letterSpacing: 1, paddingVertical: 3 }}>{expanded ? 'LESS' : 'MORE'}</CmTypography>
          </Pressable>
        </View>

        <SeeHowYouAlignModal conversation={conversation} open={showSeeHowYouAlignModal} onClose={() => setShowSeeHowYouAlignModal(false)} onViewTopics={() => {setShowSeeHowYouAlignModal(false); setShowViewSelectedTopicsModal(true);}} />
        <ViewSelectedTopicsModal conversation={conversation} open={showViewSelectedTopicsModal} onClose={() => setShowViewSelectedTopicsModal(false)} />

        <DeleteConversationModal show={showDeleteModal} userBName={userBName} onCancel={() => setShowDeleteModal(false)} onConfirm={deleteConversation} />

      </Card>

      <CopyLinkModal
        show={showCopyLinkModal}
        recipient={userBName}
        link={conversationLink}
        onClose={() => setShowCopyLinkModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
