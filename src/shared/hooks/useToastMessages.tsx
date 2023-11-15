import Toast from 'react-native-root-toast';

export default function useToastMessages() {

  function showSuccessToast(message: string) {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: '#BDFADC',
      textColor: '#000000',
      opacity: 1,
    });
  }

  function showErrorToast(message: string) {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: '#ED7878',
      textColor: '#000000',
      opacity: 1,
    });
  }

  return {
    showSuccessToast,
    showErrorToast,
  };
}
