import { useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GetAllConversations } from 'src/api/responses';
import DeleteConversationModal from './DeleteConversationModal';
import YesWeTalkedButton from './YesWeTalkedButton';
import ConversationRating from './ConversationRating';
import CopyLinkModal from './CopyLinkModal';
import SeeHowYouAlignModal from './SeeHowYouAlignModal';
import ViewSelectedTopicsModal from './ViewSelectedTopicsModal';
import { CmTypography, Card, CmIconButton, CmButton } from '@shared/components';
import NotifyIcon from './NotifyIcon';
import { useConversationState, useDeleteConversationCard } from '../hooks';
import useIconButton from '@shared/hooks/useIconButton';
import UserBInput from './UserBInput';
import useProgressConversationState from '../hooks/useProgressConversationState';

interface Props {
  conversation: GetAllConversations;
  onDelete: (conversationId: string) => void;
}

function ConversationCard({ conversation, onDelete }: Props) {
  const currentUserBName = conversation.userB.name;
  const { handleButtonClick } = useProgressConversationState();
  const { increaseState, conversationState, setConversationState, showSeeHowYouAlignModal, showViewSelectedTopicsModal, setShowSeeHowYouAlignModal, setShowViewSelectedTopicsModal } = useConversationState(conversation.state);
  const { deleteConversation, showDeleteModal, setShowDeleteModal } = useDeleteConversationCard(onDelete);
  const { setUserName: setUserBName, userName: userBName, isEditable, setIsEditable, handleSaveField, handleCancelField } = useIconButton(currentUserBName);
  const [expanded, setExpanded] = useState(false);
  const [conversationLink, setConversationLink] = useState('');
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const headerText = [`Invited ${userBName} to talk`, `Prepare to talk with ${userBName}`, `Prepare to talk with ${userBName}`, `Ready to talk with ${userBName}`, `Talked with ${userBName}`, `Talked with ${userBName}`, `Invited ${userBName} to talk`];

  function copyLink() {
    setShowCopyLinkModal(true);
    setConversationLink(process.env.EXPO_PUBLIC_WEB_URL + '/landing/' + conversation.conversationId);
  }
  console.log(conversationState);

  return (
    <Card style={{ padding: 15, backgroundColor: conversationState === 5 ? '#BDFADC' : 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CmTypography variant="caption">{headerText[conversationState]}</CmTypography>
        <Pressable onPress={copyLink} style={{ opacity: expanded ? 1 : 0, pointerEvents: expanded ? 'auto' : 'none' }}>
          <Text>COPY LINK</Text>
        </Pressable>
        {!expanded && conversationState > 0 && conversationState < 5 && <NotifyIcon />}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: expanded ? 20 : 0 }}>
        <UserBInput maxLength={20} value={userBName} onChangeText={setUserBName} isEditable={isEditable} setIsEditable={() => setIsEditable(true)} expanded={expanded} userBName={userBName} onFocus={() => setIsFocused(true)} onSubmitEditing={() => setIsFocused(false)} onEndEditing={() => setIsFocused(false)} handleCancelField={handleCancelField} handleSaveField={() => handleSaveField(conversation.conversationId)} style={[styles.textInputField, isEditable && { padding: 0, borderBottomWidth: 1, borderColor: isEditable && isFocused ? '#37f5ac' : 'black' }]} />
      </View>

      {/* For state 0, display a text that the userB has to take the quiz */}
      {expanded && conversationState === 0 && (
        <>
          <CmTypography variant="body" style={styles.text}>
            When {conversation.userB.name} is finished, we will send you an email and their results will appear here. Then you can start preparing for your chat!
          </CmTypography>
          <CmTypography variant="body" style={styles.text}>
            If you need to resend test their link, you can access it by clicking “COPY LINK”.{' '}
          </CmTypography>
        </>
      )}

      {/* For every other state, show the text and buttons the userA needs */}
      {expanded && conversationState !== 0 && (
        <>
          <CmTypography variant="h4" style={styles.subheading}>
            1. {userBName} took the values quiz
          </CmTypography>

          <CmButton text={'SEE HOW YOU ALIGN'} style={styles.whiteButton} disabled={conversationState < 1} onPress={() => handleButtonClick(() => increaseState(2), conversation.conversationId, conversationState)} />

          <CmTypography variant="h4" style={styles.subheading}>
            2. See what you can discuss with {userBName}
          </CmTypography>

          <CmButton text={'VIEW SELECTED TOPICS'} style={styles.whiteButton} disabled={conversationState < 2} onPress={() => handleButtonClick(() => increaseState(3), conversation.conversationId, conversationState)} />

          <CmTypography variant="h4" style={styles.subheading}>
            3. Have you had your conversation with {userBName}?
          </CmTypography>
          {conversationState <= 3 && <CmButton text={'YES WE TALKED'} style={styles.whiteButton} disabled={conversationState < 3} onPress={() => handleButtonClick(() => increaseState(4), conversation.conversationId, conversationState)} />}
          {conversationState > 3 && <ConversationRating conversationId={conversation.conversationId} initialRating={conversation.userARating} onRated={() => setConversationState(5)} />}
        </>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        {expanded && <CmIconButton onPress={() => setShowDeleteModal(true)} name={'trash'} source={'Foundation'} color={'#77AAAF'} size={24} />}

        <CmButton onPress={() => setExpanded((current) => !current)} style={styles.moreLessButton} text={expanded ? 'LESS' : 'MORE'} />
      </View>

      <SeeHowYouAlignModal
        conversation={conversation}
        open={showSeeHowYouAlignModal}
        onClose={() => setShowSeeHowYouAlignModal(false)}
        onViewTopics={() => {
          setShowSeeHowYouAlignModal(false);
          setShowViewSelectedTopicsModal(true);
        }}
      />
      <ViewSelectedTopicsModal conversation={conversation} conversationState={conversationState} open={showViewSelectedTopicsModal} onClose={() => setShowViewSelectedTopicsModal(false)} />
      <DeleteConversationModal show={showDeleteModal} userBName={userBName} onCancel={() => setShowDeleteModal(false)} onConfirm={() => deleteConversation(conversation.conversationId)} />
      <CopyLinkModal show={showCopyLinkModal} recipient={userBName} link={conversationLink} onClose={() => setShowCopyLinkModal(false)} />
    </Card>
  );
}

const styles = StyleSheet.create({
  textInputField: {
    fontSize: 18,
    fontFamily: 'nunito-black',
    color: 'black',
  },
  text: {
    marginVertical: 5,
  },
  subheading: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  moreLessButton: {
    marginLeft: 'auto',
    paddingHorizontal: 0,
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  whiteButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});

export default ConversationCard;
