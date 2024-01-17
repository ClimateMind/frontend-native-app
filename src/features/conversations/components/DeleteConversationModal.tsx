import { Pressable, StyleSheet, View } from 'react-native';

import { CmTypography, Card, CmModal } from '@shared/components';

interface Props {
  show: boolean;
  userBName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteConversationModal({ show, userBName, onCancel, onConfirm }: Props) {
  return (
    <CmModal visible={show} transparent={true}>
      <View style={styles.centerModal}>
        <Card style={{ padding: 20, width: '90%' }}>

          <CmTypography variant='h4' style={styles.cardHeader}>Delete Conversation?</CmTypography>
          <CmTypography variant='body'>Are you sure you want to delete your conversation with {userBName}</CmTypography>

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel}><CmTypography variant='button' style={styles.buttonText}>CANCEL</CmTypography></Pressable>
            <Pressable onPress={onConfirm}><CmTypography variant='button' style={styles.buttonText}>CONFIRM</CmTypography></Pressable>
          </View>

        </Card>
      </View>
    </CmModal>
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
