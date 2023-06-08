import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

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
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Delete Conversation?</Text>
          <Text>Are you sure you want to delete your conversation with {userBName}</Text>

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><Text>CANCEL</Text></Pressable>
            <Pressable onPress={onConfirm} style={styles.button}><Text>CONFIRM</Text></Pressable>
          </View>
        </View>
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
  card: {
    padding: 20,
    backgroundColor: 'white',
    width: '90%',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
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
  button: {
    padding: 15,
  },
});

export default DeleteConversationModal;
