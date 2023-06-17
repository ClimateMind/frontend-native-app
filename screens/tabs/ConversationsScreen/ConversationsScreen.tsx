import {  useState } from 'react';
import Toast from 'react-native-root-toast';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { WEB_URL } from '@env';

import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import useApiClient from '../../../hooks/useApiClient';
import ConversationsDrawer from './ConversationsDrawer';
import Colors from '../../../assets/colors';

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
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
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
      <Text style={styles.title}>Start a conversation</Text>
      <Text style={styles.mainText}>
        Create a personalized link for each person you want to talk to. Then
        share it, so they can take the quiz, discover your shared values, and
        pick topics to talk about.
      </Text>
      <Text style={styles.smallText}>
        We will send you an email when they agree to share their results with
        you!
      </Text>

      <Text style={styles.label}>Name of recipient </Text>
      <TextInput
        placeholder='Try "Peter Smith" or "Mom"'
        autoCapitalize="sentences"
        autoCorrect={false}
        onChangeText={(value) => setRecipient(value)}
        style={styles.input}
        value = {recipient}
      />
      <SimpleWhiteButton
        disabled={recipient === ''}
        text="CREATE LINK"
        onPress={setLink}
      />

      <Pressable
        onPress={() => setShowConversationsDrawer(true)}
        style={styles.openDrawerButton}
      >
        <AntDesign name="up" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>Ongoing Conversations</Text>
      </Pressable>

      <ConversationsDrawer
        open={showConversationsDrawer}
        onClose={() => setShowConversationsDrawer(false)}
      />
    </View>
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
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10,
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
    width: '100%',
    alignSelf: 'flex-start',
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
