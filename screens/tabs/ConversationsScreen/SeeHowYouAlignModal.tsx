import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import PageTitle from "../../../components/PageTitle";
import PersonalValueCardSmall from "../../../components/PersonalValueCardSmall";
import ViewSelectedTopicsButton from "./ViewSelectedTopicsButton";
import { GetAllConversations } from "../../../api/responses";
import useApiClient from "../../../hooks/useApiClient";
import Alignment from "../../../types/Alignment";

interface Props {
  open: boolean;
  conversation: GetAllConversations;
  onClose: () => void;
  onViewTopics: () => void;
}

function SeeHowYouAlignModal({ open, conversation, onClose, onViewTopics }: Props) {  
  const apiClient = useApiClient();
  
  const [userBName, setUserBName] = useState<string>()
  const [topSharedValue, setTopSharedValue] = useState<Alignment>()

  useEffect(() => {
    if (conversation.state < 2) {
      return;
    }
    
    setUserBName(conversation.userB.name);

    apiClient.getAlignmentScores(conversation.alignmentScoresId)
      .then(response => {
        setUserBName(response.userBName);
        setTopSharedValue(response.valueAlignment[0]);
      })
      .catch(error => console.log(error));
  }, [conversation]);
  
  if (!open || conversation.state <= 2 || !userBName || !topSharedValue) {
    return null;
  }
  
  return (
    <Modal
      visible={open}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.backButtonContainer} onPress={onClose}>
          <Ionicons name="chevron-back-outline" size={24} color="#A347FF" />
          <Text style={styles.backButtonText}>BACK</Text>
        </Pressable>
        
        <PageTitle>Your shared core values!</PageTitle>

        <Text style={styles.subheader}>How do your values align with {userBName}'s?</Text>
        <Text style={styles.text}>Understanding your shared core values will help you identify how to tackle climate topics and solutions with friends.</Text>

        <Text style={styles.subheader}>Top Shared Core Value</Text>
        <PersonalValueCardSmall name={topSharedValue.name} shortDescription={topSharedValue.shortDescription} percentage={topSharedValue.score} />

        <Text style={styles.subheader}>Overall Similarity</Text>
        <Text style={styles.percentage}>{topSharedValue.score}%</Text>

        <ViewSelectedTopicsButton conversationId={conversation.conversationId} conversationState={2} style={{ marginTop: 50 }} onClick={onViewTopics} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(138, 213, 204, 0.6)',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
  },
  subheader: {
    fontSize: 16,
    letterSpacing: 1.1,
    textAlign: 'center',
    marginVertical: 20,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default SeeHowYouAlignModal;
