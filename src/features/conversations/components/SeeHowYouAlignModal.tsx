import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Colors from 'src/assets/colors';
import { GetAllConversations } from 'src/api/responses';
import useApiClient from 'src/hooks/useApiClient';
import Alignment from 'src/types/Alignment';
import { CmModal, CmTypography, Content, BackButton, CmButton } from '@shared/components';
import PersonalValueCardSmall from './PersonalValueCardSmall';
import useProgressConversationState from '../hooks/useProgressConversationState';
import { useConversationState } from '../hooks';

interface Props {
  open: boolean;
  conversation: GetAllConversations;
  onClose: () => void;
  onViewTopics: () => void;
}

function SeeHowYouAlignModal({ open, conversation, onClose, onViewTopics }: Props) {
  const apiClient = useApiClient();

  const { conversationState } = useConversationState(conversation.state);
  const { progressConversation } = useProgressConversationState();
  const [userBName, setUserBName] = useState<string>();
  const [topSharedValue, setTopSharedValue] = useState<Alignment>();
  const [overallSimilarityScore, setOverallSimilarityScore] = useState<number>();

  useEffect(() => {
    setUserBName(conversation.userB.name);

    if (conversation.alignmentScoresId) {
      apiClient.getAlignmentScores(conversation.alignmentScoresId)
        .then((response) => {
          setUserBName(response.userBName);
          setTopSharedValue(response.valueAlignment[0]);
          setOverallSimilarityScore(response.overallSimilarityScore);
        })
        .catch((error) => console.log(error));
    }
  }, [conversation]);

  if (!open || !userBName || !topSharedValue || !overallSimilarityScore) {
    return null;
  }

  return (
    <CmModal visible={open} transparent={false} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <Content>
          <ScrollView>
            <BackButton onPress={onClose} style={{ marginVertical: 25 }} />

            <CmTypography variant="h1">Your shared core values!</CmTypography>

            <CmTypography variant="body" style={styles.subheader}>
              How do your values align with {userBName}'s?
            </CmTypography>

            <CmTypography variant="body" style={styles.text}>
              Understanding your shared core values will help you identify how to tackle climate topics and solutions with friends.
            </CmTypography>

            <CmTypography variant="body" style={styles.subheader}>Top Shared Core Value</CmTypography>

            <PersonalValueCardSmall name={topSharedValue.name} shortDescription={topSharedValue.shortDescription} percentage={topSharedValue.score} />

            <CmTypography variant="body" style={styles.subheader}>Overall Similarity</CmTypography>
            <CmTypography variant="h1" style={styles.percentage}>{overallSimilarityScore.toString()}%</CmTypography>

            <CmButton text={'VIEW SELECTED TOPICS'} style={{ marginTop: 50 }} disabled={conversationState < 2} onPress={() => progressConversation(onViewTopics, conversation.conversationId, 2)} />
          </ScrollView>
        </Content>
      </View>
    </CmModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.themeBright,
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
