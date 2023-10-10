import { StyleSheet, View } from 'react-native';

interface Props {
  progress: number;
}

function ProgressBar({ progress }: Props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={[styles.progressBarLeft, { width: `${(progress) * 100}%`}]}></View>
      <View style={[styles.progressBarRight, { width: `${100 - progress * 100}%`}]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarLeft: {
    backgroundColor: 'black',
    height: 6,
  },
  progressBarRight: {
    backgroundColor: '#a347ff',
    height: 6,
  },
});

export default ProgressBar;
