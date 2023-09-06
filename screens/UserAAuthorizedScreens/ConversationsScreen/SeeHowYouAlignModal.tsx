import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../../assets/colors";
import PersonalValueCardSmall from "../../../components/Cards/PersonalValueCardSmall";
import ViewSelectedTopicsButton from "./ViewSelectedTopicsButton";
import { GetAllConversations } from "../../../api/responses";
import useApiClient from "../../../hooks/useApiClient";
import Alignment from "../../../types/Alignment";
import Headline1 from "../../../components/TextStyles/Headline1";
import ButtonText from "../../../components/TextStyles/ButtonText";
import BodyText from "../../../components/TextStyles/BodyText";
import Content from "../../../components/Screen/Content";

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
          <Pressable style={styles.backButtonContainer} onPress={onClose}>
            <Ionicons name="chevron-back-outline" size={24} color="#A347FF" />
            <ButtonText style={styles.backButtonText}>BACK</ButtonText>
          </Pressable>
          
          <Headline1 style={{ padding: 8 }}>Your shared core values!</Headline1>

          <BodyText style={styles.subheader}>How do your values align with {userBName}'s?</BodyText>
          <BodyText style={styles.text}>Understanding your shared core values will help you identify how to tackle climate topics and solutions with friends.</BodyText>

          <BodyText style={styles.subheader}>Top Shared Core Value</BodyText>
          <PersonalValueCardSmall name={topSharedValue.name} shortDescription={topSharedValue.shortDescription} percentage={topSharedValue.score} />

          <BodyText style={styles.subheader}>Overall Similarity</BodyText>
          <Headline1 style={styles.percentage}>{topSharedValue.score.toString()}%</Headline1>

          <ViewSelectedTopicsButton conversationId={conversation.conversationId} conversationState={2} style={{ marginTop: 50 }} onClick={onViewTopics} />
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
