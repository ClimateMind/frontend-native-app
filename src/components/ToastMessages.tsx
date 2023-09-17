import Toast from 'react-native-root-toast';

export function showSuccessToast(message: string) {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    backgroundColor: '#BDFADC',
    textColor: '#000000',
    opacity: 1,
  });
}

export function showErrorToast(message: string) {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    backgroundColor: '#ED7878',
    textColor: '#000000',
    opacity: 1,
  });
}
