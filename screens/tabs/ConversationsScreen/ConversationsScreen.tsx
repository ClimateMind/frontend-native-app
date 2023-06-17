
import {  useState } from 'react';
import Toast from 'react-native-root-toast';
import { Dimensions, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { WEB_URL } from '@env';

import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import useApiClient from '../../../hooks/useApiClient';
import ConversationsDrawer from './ConversationsDrawer';
import PageTitle from '../../../components/PageTitle';

function ConversationsScreen() {
  const apiClient = useApiClient();
  const [recipient, setRecipient] = useState('');
  const [showConversationsDrawer, setShowConversationsDrawer] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Sets the link and then imediately gets the link and updates the copied text state so that it can be displayed on the modal
    async function setLink() {
      try {
        if (recipient === '') {
          return;
        }
        const result = await apiClient.createConversationInvite(recipient);
        Clipboard.setStringAsync(WEB_URL + '/landing/' + result.conversationId);
        getLink()
        setModalVisible(true);
      } catch (e) {
        console.log(e);
      }
    }

    async function getLink() {
      try {
        const getResult = await Clipboard.getStringAsync();
        setCopiedText(getResult);
      } catch (e) {
        console.log(e);
      }
    }

    //Pressing the copy button just closes the modal. This doesn't actually copy, it creates the illusion of copying to clipboard but because copying to clipboard has already been done in the above functions all this does is close the modal
    function closeModal(){
      setRecipient("")
      setModalVisible(!true);
        Toast.show('Copied to clipboard.',
          {
            duration: Toast.durations.LONG,
            backgroundColor: '#09353C',
            textColor: 'white',
            opacity: 0.8,
          }
        ); 
    }

  return (
   <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.mainSection}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centerModal}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>Copy Link</Text>
            <Text style={styles.modalText}>Unique for {recipient}</Text>
            <Text style={styles.modalText}>{copiedText}</Text>
           
            <Pressable onPress={closeModal} style={styles.copyButton}>
              
              <Text style ={styles.modalText}>Copy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <PageTitle>Start a Conversation</PageTitle>
     <Text style={styles.mainText}>
          Create a personalized link for each person you want to talk to. Then
          share it, so they can take the quiz, discover your shared values, and
          pick topics to talk about.
        </Text>
      <Text style={styles.smallText}>We will send you an email when they agree to share their results with you!</Text>

        <Text style={styles.label}>Name of recipient</Text>
        <TextInput
          placeholder='Try "Peter Smith" or "Mom"'
          autoCapitalize="sentences"
          autoCorrect={false}
          onChangeText={(value) => setRecipient(value)}
          style={styles.input}
          value={recipient}
        />
      <SimpleWhiteButton
        disabled={recipient === ''}
        text="CREATE LINK"
        onPress={setLink}
      />

    </KeyboardAvoidingView>

      <Pressable onPress={() => setShowConversationsDrawer(true)} style={styles.openDrawerButton}>

        <AntDesign name="up" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>Ongoing Conversations</Text>
      </Pressable>
      <ConversationsDrawer
        open={showConversationsDrawer}
        onClose={() => setShowConversationsDrawer(false)}
      />

  </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalCard: {
    padding: 20,
    backgroundColor: 'white',
    width: '90%',
  },
  copyButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  mainSection: {
    flex: 1,
    alignItems: 'center',
  },
  mainText: {
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
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
