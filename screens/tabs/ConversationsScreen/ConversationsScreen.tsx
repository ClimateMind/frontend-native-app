import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
  
  async function createLink() {
    if (recipient === '') {
      return;
    }

    const result = await apiClient.createConversationInvite(recipient);
    Clipboard.setStringAsync(WEB_URL + '/landing/' + result.conversationId);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a conversation</Text>
      <Text style={styles.mainText}>
        Create a personalized link for each person you want to talk to. Then share it, so they can
        take the quiz, discover your shared values, and pick topics to talk about.
      </Text>
      <Text style={styles.smallText}>We will send you an email when they agree to share their results with you!</Text>

      <Text style={styles.label}>Name of recipient </Text>
      <TextInput
        placeholder='Try "Peter Smith" or "Mom"'
        autoCapitalize='sentences'
        
        autoCorrect={false}
        onChangeText={(value) => setRecipient(value)}
        style={styles.input}
      />
      <SimpleWhiteButton disabled={recipient === ''} text='CREATE LINK' onPress={createLink} />

      <Pressable onPress={() => setShowConversationsDrawer(true)} style={styles.openDrawerButton}>
      <AntDesign name="up" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>Ongoing Conversations</Text>
      </Pressable>

      <ConversationsDrawer open={showConversationsDrawer} onClose={() => setShowConversationsDrawer(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
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
