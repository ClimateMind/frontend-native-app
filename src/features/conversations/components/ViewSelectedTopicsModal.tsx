import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Colors from 'src/assets/colors';
import { GetAllConversations } from 'src/api/responses';
import useApiClient from 'src/hooks/useApiClient';
import ClimateEffect2 from 'src/types/ClimateEffect2';
import Solution3 from 'src/types/Solution3';
import ActionCard from './ActionCard';
import SolutionsFeedCard from './SolutionCard';
import SolutionDetailsModal from './SolutionDetailsModal';
import ActionDetailsModal from './ActionDetailsModal';
import { BackButton, CmModal, CmTypography, Content } from '@shared/components';;

interface Props {
  open: boolean;
  conversation: GetAllConversations;
  conversationState: number;
  onClose: () => void;
}

function ViewSelectedTopicsModal({ open, conversation, conversationState, onClose }: Props) {
  const apiClient = useApiClient();

  const [climateEffect, setClimateEffect] = useState<ClimateEffect2>();
  const [climateSolutions, setClimateSolutions] = useState<Solution3[]>();

  const [showActionDetails, setShowActionDetails] = useState(false);

  const [solutionDetails, setSolutionDetails] = useState<Solution3>();
  const [showSolutionDetails, setShowSolutionDetails] = useState(false);

  useEffect(() => {
    if (conversation.conversationId && conversationState > 2) {
      apiClient.getSelectedTopics(conversation.conversationId)
        .then(response => {
          setClimateEffect(response.climateEffects[0]);
          setClimateSolutions(response.climateSolutions);
          setSolutionDetails(response.climateSolutions[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [conversation, conversationState]);

  if (!open || !climateEffect || !climateSolutions || !solutionDetails) {
    return null;
  }

  return (
    <CmModal
      visible={open}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Content>
          <ScrollView>
            <BackButton onPress={onClose} style={{ marginVertical: 25 }} />

            <CmTypography variant='h1'>Your shared feed with {conversation.userB.name}</CmTypography>

            <CmTypography variant='body' style={styles.text}>These are climate effects that matter to you both; great starting point for having a constructive conversation.</CmTypography>

            <View style={{ marginVertical: 20 }}>
              <ActionCard climateEffect={climateEffect} onLearnMore={() => setShowActionDetails(true)} />
            </View>

            {climateSolutions.map(climateSolution => (
              <View key={climateSolution.solutionId} style={{ marginVertical: 20 }}>
                <SolutionsFeedCard solution={climateSolution} onLearnMore={() => { setShowSolutionDetails(true); setSolutionDetails(climateSolution) }} />
              </View>
            ))}

            <View style={{ height: 70 }}></View>
          </ScrollView>
        </Content>
      </View>

      <ActionDetailsModal open={showActionDetails} action={climateEffect} onClose={() => setShowActionDetails(false)} />
      <SolutionDetailsModal open={showSolutionDetails} solution={solutionDetails} onClose={() => setShowSolutionDetails(false)} />
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
  text: {
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ViewSelectedTopicsModal;
