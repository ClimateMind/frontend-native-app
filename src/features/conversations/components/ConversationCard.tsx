import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
import { CmTypography, Card } from '@shared/components';
import NotifyIcon from './NotifyIcon';
import CmIconButton from 'src/shared/components/CmIconButton';
import { useIconButton } from 'src/shared/hooks';

interface Props {
  conversation: GetAllConversations;
  onDelete: (conversationId: string) => void;
}

function ConversationCard({ conversation, onDelete }: Props) {
  const apiClient = useApiClient();
  const currentUserBName = conversation.userB.name;
  const { setUserName: setUserBName, userName: userBName, isEditable, setIsEditable, handleSaveField, handleCancelField } = useIconButton(currentUserBName);
  const [expanded, setExpanded] = useState(false);
  const [conversationState, setConversationState] = useState(conversation.state);

  const [conversationLink, setConversationLink] = useState('');
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [showSeeHowYouAlignModal, setShowSeeHowYouAlignModal] = useState(false);
  const [showViewSelectedTopicsModal, setShowViewSelectedTopicsModal] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const headerText = [`Invited ${userBName} to talk`, `Prepare to talk with ${userBName}`, `Prepare to talk with ${userBName}`, `Ready to talk with ${userBName}`, `Talked with ${userBName}`, `Talked with ${userBName}`, `Invited ${userBName} to talk`];

  function copyLink() {
    setShowCopyLinkModal(true);
    setConversationLink(process.env.EXPO_PUBLIC_WEB_URL + '/landing/' + conversation.conversationId);
  }

  // function deleteConversation() {
  //   setShowDeleteModal(false);
  //   apiClient
  //     .deleteConversation(conversation.conversationId)
  //     .then(() => onDelete(conversation.conversationId))
  //     .catch((error) => console.log(error));
  // }

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
    <Card style={{ padding: 15, backgroundColor: conversationState === 5 ? '#BDFADC' : 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CmTypography variant="caption">{headerText[conversationState]}</CmTypography>
        <Pressable onPress={copyLink} style={{ opacity: expanded ? 1 : 0, pointerEvents: expanded ? 'auto' : 'none' }}>
          <Text>COPY LINK</Text>
        </Pressable>
        {!expanded && conversationState > 0 && conversationState < 5 && <NotifyIcon />}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: expanded ? 20 : 0 }}>
        <TextInput style={[styles.textInputField, isEditable && { padding: 0, borderBottomWidth: 1, borderColor: isEditable && isFocused ? '#37f5ac' : 'black' }]} editable={isEditable} onChangeText={setUserBName} value={userBName} maxLength={20} onFocus={() => setIsFocused(true)} onSubmitEditing={() => setIsFocused(false)} onEndEditing={() => setIsFocused(false)} />
        {expanded && (
          <>
            {!isEditable && <CmIconButton onPress={()=>setIsEditable(true)} name={'edit'} source={'MaterialIcons'} color={'black'} size={22} />}
            {isEditable && userBName.length > 0 && <CmIconButton onPress={() => handleSaveField(conversation.conversationId)} name={'check'} source={'MaterialIcons'} color={'black'} size={22} />}
            {isEditable && <CmIconButton onPress={handleCancelField} name={'cross'} source={'Entypo'} color={'black'} size={22} />}
          </>
        )}
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
          <SeeHowYouAlignButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(2)} />

          <CmTypography variant="h4" style={styles.subheading}>
            2. See what you can discuss with {userBName}
          </CmTypography>
          <ViewSelectedTopicsButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(3)} />

          <CmTypography variant="h4" style={styles.subheading}>
            3. Have you had your conversation with {userBName}?
          </CmTypography>
          {conversationState <= 3 && <YesWeTalkedButton style={styles.whiteButton} conversationId={conversation.conversationId} conversationState={conversationState} onClick={() => increaseState(4)} />}
          {conversationState > 3 && <ConversationRating conversationId={conversation.conversationId} initialRating={conversation.userARating} onRated={() => setConversationState(5)} />}
        </>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        {expanded && (
          <Pressable onPress={() => setShowDeleteModal(true)} style={styles.deleteButton}>
            <Foundation name="trash" size={24} color="#77AAAF" />
          </Pressable>
        )}
        <Pressable onPress={() => setExpanded((current) => !current)} style={styles.moreLessButton}>
          <CmTypography variant="button" style={{ letterSpacing: 1, paddingVertical: 5 }}>
            {expanded ? 'LESS' : 'MORE'}
          </CmTypography>
        </Pressable>
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
      <DeleteConversationModal show={showDeleteModal} userBName={userBName} onCancel={() => setShowDeleteModal(false)} onConfirm={deleteConversation} />
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
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  moreLessButton: {
    padding: 5,
    marginTop: 10,
    marginLeft: 'auto',
  },
  whiteButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});

export default ConversationCard;
