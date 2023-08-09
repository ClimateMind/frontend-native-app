import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { WEB_URL } from '@env';
import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import useApiClient from '../../../hooks/useApiClient';
import ConversationsDrawer from './ConversationsDrawer';
import CopyLinkModal from './CopyLinkModal';
import { showErrorToast } from '../../../components/ToastMessages';
import LabelText from '../../../components/TextStyles/LabelText';
import Headline2 from '../../../components/TextStyles/Headline2';
import BodyText from '../../../components/TextStyles/BodyText';
import CaptionText from '../../../components/TextStyles/CaptionText';

function ConversationsScreen() {
  const apiClient = useApiClient();
  const [recipient, setRecipient] = useState('');
  const [showConversationsDrawer, setShowConversationsDrawer] = useState(false);

  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [conversationLink, setConversationLink] = useState('');

  /** Create the conversation link and show the modal to copy it */
  async function showModal() {
    if (recipient === '') {
      return;
    }

    try {
      const result = await apiClient.createConversationInvite(recipient);
      setConversationLink(WEB_URL + '/landing/' + result.conversationId);

      setShowCopyLinkModal(true);
    } catch (e) {
      showErrorToast('Error creating link. Please try again later.');
    }
  }

  function closeModal() {
    setRecipient('');
    setShowCopyLinkModal(false);
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>

        <KeyboardAvoidingView behavior="position" style={styles.mainSection}>
          <Headline2>Start a Conversation</Headline2>
          <BodyText style={styles.center}>
            Create a personalized link for each person you want to talk to. Then
            share it, so they can take the quiz, discover your shared values, and
            pick topics to talk about.
          </BodyText>
          <CaptionText style={styles.center}>We will send you an email when they agree to share their results with you!</CaptionText>

          <LabelText style={styles.label}>Name of recipient</LabelText>
          <TextInput
            placeholder='Try "Peter Smith" or "Mom"'
            autoCapitalize="sentences"
            autoCorrect={false}
            onChangeText={(value) => setRecipient(value)}
            style={styles.input}
            value={recipient}
            placeholderTextColor={'#88999C'}
          />
          <SimpleWhiteTextButton style={styles.createLinkButton} disabled={recipient === ''} text='CREATE LINK' onPress={showModal} />
        </KeyboardAvoidingView>

        <Pressable onPress={() => setShowConversationsDrawer(true)} style={styles.openDrawerButton}>
          <AntDesign name="up" size={24} color="black" />
          <BodyText style={{ fontWeight: 'bold', letterSpacing: 1.2 }}>Ongoing Conversations</BodyText>
        </Pressable>

        <ConversationsDrawer
          open={showConversationsDrawer}
          onClose={() => setShowConversationsDrawer(false)}
        />

      </ScrollView>

      <CopyLinkModal
        show={showCopyLinkModal}
        recipient={recipient}
        link={conversationLink}
        onClose={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  mainSection: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
    marginVertical: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 30,
  },
  input: {
    alignSelf: 'stretch',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    fontWeight: 'bold',
    elevation: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  createLinkButton: {
    marginTop: 30,
    marginBottom: 15,
    minWidth: 160,
    width: 200,
    alignSelf: 'center',
  },
  openDrawerButton: {
    backgroundColor: '#BBE6E2',
    width: Dimensions.get('screen').width,
    height: 100,
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default ConversationsScreen;
