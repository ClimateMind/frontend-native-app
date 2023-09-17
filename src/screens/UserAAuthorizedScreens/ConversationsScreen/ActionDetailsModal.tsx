import { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { capitalize } from "lodash";

import Colors from "src/assets/colors";
import ClimateEffect2 from "src/types/ClimateEffect2";
import ClimateEffect3 from "src/types/ClimateEffect3";
import DetailsSourcesTab from "src/components/DetailsSourcesTabs";
import useApiClient from "src/hooks/useApiClient";
import Headline3 from "src/components/TextStyles/Headline3";
import BodyText from "src/components/TextStyles/BodyText";
import LabelText from "src/components/TextStyles/LabelText";

interface Props {
  open: boolean;
  action: ClimateEffect2;
  onClose: () => void;
}

function ActionDetailsModal({ open, action, onClose }: Props) {
  const apiClient = useApiClient();
  
  const [actionDetails, setActionDetails] = useState<ClimateEffect3>();
  const [selectedTab, setSelectedTab] = useState(0);
  
  useEffect(() => {
    apiClient.getSharedImpactDetails(action.effectId)
      .then(response => {
        setActionDetails(response);
      });
  }, [action]);
  
  if (!actionDetails) {
    return null;
  }
  
  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={{ alignItems: 'center', width: '100%', paddingTop: 20 }} onPress={onClose}>
          <LabelText>Close</LabelText>
          <MaterialIcons name="keyboard-arrow-down" size={50} color={Colors.themeBright} style={{ top: -15, }} />
        </Pressable>

        <ScrollView style={{ width: '100%' }}>

          <Headline3 style={styles.title}>{capitalize(actionDetails.effectTitle)}</Headline3>
          {actionDetails.imageUrl !== null && <Image style={styles.image} source={{uri: actionDetails.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <BodyText style={styles.text}>{actionDetails.longDescription}</BodyText>
          </View>}

          {selectedTab === 1 && actionDetails.effectSources.map(source => <View key={source} style={styles.links}><LabelText style={styles.link}>{source}</LabelText></View>)}

        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    marginTop: '3%',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    padding: 20,
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 250,
  },
  text: {
    letterSpacing: 1,
    lineHeight: 20,
    padding: 20,
  },
  links: {
    padding: 10,
  },
  link: {
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default ActionDetailsModal;
