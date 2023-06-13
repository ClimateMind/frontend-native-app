import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

  async function createLink() {
    if (recipient === '') {
      return;
    }

    const result = await apiClient.createConversationInvite(recipient);
    Clipboard.setStringAsync(WEB_URL + '/landing/' + result.conversationId);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.mainSection}>

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
        />
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <SimpleWhiteButton disabled={recipient === ''} text="CREATE LINK" onPress={createLink} />
        </View>

      </KeyboardAvoidingView>

      <Pressable onPress={() => setShowConversationsDrawer(true)} style={styles.openDrawerButton}>
        <AntDesign name="up" size={24} color="black" />
        <Text style={{ fontWeight: 'bold' }}>Ongoing Conversations</Text>
      </Pressable>

      <ConversationsDrawer open={showConversationsDrawer} onClose={() => setShowConversationsDrawer(false)} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
