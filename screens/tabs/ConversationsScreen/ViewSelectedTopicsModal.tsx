import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import PageTitle from "../../../components/PageTitle";
import { GetAllConversations } from "../../../api/responses";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import ClimateEffect2 from "../../../types/ClimateEffect2";
import Solution3 from "../../../types/Solution3";
import ActionCard from "./ActionCard";
import SolutionsFeedCard from "./SolutionCard";
import SolutionDetailsModal from "./SolutionDetailsModal";
import ActionDetailsModal from "./ActionDetailsModal";

interface Props {
  open: boolean;
  conversation: GetAllConversations;
  onClose: () => void;
}

function ViewSelectedTopicsModal({ open, conversation, onClose }: Props) {
  const apiClient = useApiClient();

  const [climateEffect, setClimateEffect] = useState<ClimateEffect2>()
  const [climateSolutions, setClimateSolutions] = useState<Solution3[]>()
  
  const [showActionDetails, setShowActionDetails] = useState(false);
  
  const [solutionDetails, setSolutionDetails] = useState<Solution3>();
  const [showSolutionDetails, setShowSolutionDetails] = useState(false);
  
  useEffect(() => {
    if (conversation.state < 2) return;
    
    apiClient.getSelectedTopics(conversation.conversationId)
      .then(response => {
        setClimateEffect(response.climateEffects[0]);
        setClimateSolutions(response.climateSolutions);
        setSolutionDetails(response.climateSolutions[0]);
      })
      .catch(error => console.log(error));
  }, [conversation]);
  
  if (!open || !climateEffect || !climateSolutions || !solutionDetails) {
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
          <ScrollView style={{ padding: 20 }}>
            <Pressable style={styles.backButtonContainer} onPress={onClose}>
              <Ionicons name="chevron-back-outline" size={24} color="#A347FF" />
              <Text style={styles.backButtonText}>BACK</Text>
            </Pressable>

            <PageTitle>Your shared feed with {conversation.userB.name}</PageTitle>

            <Text style={styles.text}>These are climate effects that matter to you both; great starting point for having a constructive conversation.</Text>

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
        </View>

        <ActionDetailsModal open={showActionDetails} action={climateEffect} onClose={() => setShowActionDetails(false)} />
        <SolutionDetailsModal open={showSolutionDetails} solution={solutionDetails} onClose={() => setShowSolutionDetails(false)} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ViewSelectedTopicsModal;
