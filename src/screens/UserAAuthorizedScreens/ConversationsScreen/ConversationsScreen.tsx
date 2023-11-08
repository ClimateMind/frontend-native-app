import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Colors from 'src/assets/colors';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import useApiClient from 'src/hooks/useApiClient';
import { ConversationsDrawer, CopyLinkModal } from 'src/features/conversations/components'
// import ConversationsDrawer from './ConversationsDrawer';
// import CopyLinkModal from './CopyLinkModal';
import { showErrorToast } from 'src/components/ToastMessages';
import { CmTypography, CmButton } from '@shared/components';

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
      setConversationLink(process.env.EXPO_PUBLIC_WEB_URL + '/landing/' + result.conversationId);

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
      <Screen style={{ backgroundColor: 'white' }}>
        <Section style={{ paddingBottom: 0 }}>
          <Content>
            <KeyboardAvoidingView behavior="position" style={styles.mainSection}>
              <CmTypography variant='h2'>Start a Conversation</CmTypography>
              <CmTypography variant='body' style={styles.center}>
                Create a personalized link for each person you want to talk to. Then
                share it, so they can take the quiz, discover your shared values, and
                pick topics to talk about.
              </CmTypography>
              <CmTypography variant="caption" style={{ textAlign: 'center' }}>
                We will send you an email when they agree to share their results with you!
              </CmTypography>
              <CmTypography variant='label' style={styles.label}>Name of recipient</CmTypography>
              <TextInput
                placeholder='Try "Peter Smith" or "Mom"'
                autoCapitalize="sentences"
                autoCorrect={false}
                onChangeText={(value) => setRecipient(value)}
                style={styles.input}
                value={recipient}
                placeholderTextColor={'#88999C'}
                maxLength={20}
              />
              <CmButton style={styles.createLinkButton} disabled={recipient === ''} text='CREATE LINK' onPress={showModal} />
            </KeyboardAvoidingView>

            <Pressable onPress={() => setShowConversationsDrawer(true)} style={styles.openDrawerButton}>
              <AntDesign name="up" size={24} color="black" />
              <CmTypography variant='body' style={{ fontWeight: 'bold', letterSpacing: 1.2 }}>Ongoing Conversations</CmTypography>
            </Pressable>

            <ConversationsDrawer
              open={showConversationsDrawer}
              onClose={() => setShowConversationsDrawer(false)}
            />
          </Content>
        </Section>
      </Screen>

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
    backgroundColor: Colors.themeBright,
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
