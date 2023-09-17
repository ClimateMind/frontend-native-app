import { Modal, Pressable, StyleSheet, View } from 'react-native';

import Headline4 from 'src/components/TextStyles/Headline4';
import BodyText from 'src/components/TextStyles/BodyText';
import ButtonText from 'src/components/TextStyles/ButtonText';
import Card from 'src/components/Cards/Card';

interface Props {
  show: boolean;
  userBName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteConversationModal({ show, userBName, onCancel, onConfirm }: Props) {
  return (
    <Modal
      visible={show}
      transparent={true}
    >
      <View style={styles.centerModal}>
        <Card style={{ padding: 20, width: '90%' }}>

          <Headline4 style={styles.cardHeader}>Delete Conversation?</Headline4>
          <BodyText>Are you sure you want to delete your conversation with {userBName}</BodyText>

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel}><ButtonText style={styles.buttonText}>CANCEL</ButtonText></Pressable>
            <Pressable onPress={onConfirm}><ButtonText style={styles.buttonText}>CONFIRM</ButtonText></Pressable>
          </View>

        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardHeader: {
    textAlign: 'left',
    marginBottom: 10,
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    padding: 10,
    paddingTop: 40,
  },
});

export default DeleteConversationModal;
