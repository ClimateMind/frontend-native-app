import { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import CmTypography from './CmTypography';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { hideToast } from 'src/store/sharedSlice';

function CmToast() {
  const dispatch = useAppDispatch();
  const { toastMessage, toastType, toastShow } = useAppSelector((state) => state.shared);
  const [open, setOpen] = useState(false);

  const backgroundColor = toastType === 'success' ? '#BDFADC' : '#ED7878';

  let timeout: NodeJS.Timeout;
  const fadeAnimationValue = new Animated.Value(0);

  let fadeInAnimation = Animated.timing(fadeAnimationValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });

  function handleCloseToast() {
    fadeInAnimation.stop();
    setOpen(false);
    dispatch(hideToast());
    clearTimeout(timeout);
  }

  useEffect(() => {
    if (toastShow) {
      setOpen(true);
      fadeInAnimation.start();

      timeout = setTimeout(() => {
        handleCloseToast();
      }, 3000);
    } else {
      handleCloseToast();
    }

    return () => clearTimeout(timeout);
  }, [toastShow, open]);

  if (!open) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { position: 'absolute', bottom: 60, backgroundColor, opacity: fadeAnimationValue }]}>
      {toastType === 'error' && <MaterialIcons name="error-outline" size={24} color="black" style={{ alignSelf: 'flex-start' }} />}
      {toastType === 'success' && <Feather name="check-circle" size={24} style={{ alignSelf: 'flex-start' }} color="black" />}
      <View style={{ flexShrink: 1 }}>
          <CmTypography variant='body'>{toastMessage}</CmTypography>
      </View>
      <AntDesign name="close" size={24} color="black" onPress={handleCloseToast} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignSelf: 'center', padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: '10%',
    maxWidth: 400,
  },
});

export default CmToast;
