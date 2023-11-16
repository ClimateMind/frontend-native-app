import Toast from 'react-native-root-toast';

function useToastMessages() {
  const options = {
    duration: Toast.durations.LONG,
    textColor: '#000000',
    opacity: 1,
  };

  function showSuccessToast(message: string) {
    Toast.show(message, { ...options, backgroundColor: '#BDFADC' });
  }

  function showErrorToast(message: string) {
    Toast.show(message, { ...options, backgroundColor: '#ED7878' });
  }

  return {
    showSuccessToast,
    showErrorToast,
  };
}

export default useToastMessages;
