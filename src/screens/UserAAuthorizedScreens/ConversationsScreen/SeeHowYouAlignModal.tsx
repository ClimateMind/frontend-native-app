import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Colors from "src/assets/colors";
import PersonalValueCardSmall from "src/components/Cards/PersonalValueCardSmall";
import ViewSelectedTopicsButton from "./ViewSelectedTopicsButton";
import { GetAllConversations } from "src/api/responses";
import useApiClient from "src/hooks/useApiClient";
import Alignment from "src/types/Alignment";
import { CmTypography } from "src/components";
import Content from "src/components/Screen/Content";

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
        <Content>
          <ScrollView>
            <Pressable style={styles.backButtonContainer} onPress={onClose}>
              <Ionicons name="chevron-back-outline" size={24} color="#A347FF" />
              <CmTypography variant='button' style={styles.backButtonText}>BACK</CmTypography>
            </Pressable>
            
            <CmTypography variant='h1'>Your shared core values!</CmTypography>

            <CmTypography variant='body' style={styles.subheader}>How do your values align with {userBName}'s?</CmTypography>
            <CmTypography variant='body' style={styles.text}>Understanding your shared core values will help you identify how to tackle climate topics and solutions with friends.</CmTypography>

            <CmTypography variant='body' style={styles.subheader}>Top Shared Core Value</CmTypography>
            <PersonalValueCardSmall name={topSharedValue.name} shortDescription={topSharedValue.shortDescription} percentage={topSharedValue.score} />

            <CmTypography variant='body' style={styles.subheader}>Overall Similarity</CmTypography>
            <CmTypography variant='h1' style={styles.percentage}>{topSharedValue.score.toString()}%</CmTypography>

            <ViewSelectedTopicsButton conversationId={conversation.conversationId} conversationState={2} style={{ marginTop: 50 }} onClick={onViewTopics} />
          </ScrollView>
        </Content>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.themeBright,
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingTop: 30,
  },
  backButtonText: {
    marginLeft: 10,
  },
  subheader: {
    textAlign: 'center',
    marginVertical: 20,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  percentage: {
    padding: 8,
  },
});

export default SeeHowYouAlignModal;
