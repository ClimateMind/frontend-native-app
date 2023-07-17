import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import SocialImagesGrid from './SocialImagesGrid';
import DrawerButton from './DrawerButton';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';
import { openUrl } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';

type Props = DrawerContentComponentProps;

function CustomDrawerContent({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  
  function onLogout() {
    dispatch(logout());
    navigation.closeDrawer();
  }
  
  return (
    <View style={[styles.container, { height: Dimensions.get('screen').height - 120 }]}>

      {/* Text Buttons above the social images */}
      <View>
        {isLoggedIn && <Text style={styles.textButton} onPress={() => navigation.navigate('PersonalValuesScreen')}>Personal Values</Text>}
        {isLoggedIn && <Text style={styles.textButton} onPress={() => navigation.navigate('QuizScreen', { questionSet: 1 })}>Retake the Quiz</Text>}
        {isLoggedIn && <Text style={styles.textButton} onPress={() => navigation.navigate('ConversationsScreen')}>Conversations</Text>}
        <Text style={styles.textButton} onPress={() => openUrl('https://climatemind.org/')}>About Climate Mind</Text>
        <Text style={styles.textButton} onPress={() => openUrl('https://t.me/climatemind_chat')}>Community & Chat</Text>
        <Text style={styles.textButton} onPress={() => openUrl('https://app.climatemind.org/privacy')}>Privacy Policy</Text>
      </View>

      <View>
        {/* The social images */}
        <SocialImagesGrid />

        {/* Login / Logout and Feedback button beneath the social images */}
        <View style={{ margin: 10, marginTop: 30, marginLeft: 20 }}>
          {!isLoggedIn && <DrawerButton text='LOG IN' icon={<MaterialIcons name="login" size={24} color="black" />} onPress={() => navigation.navigate('LoginScreen')} />}
          {isLoggedIn && <DrawerButton text='LOGOUT' icon={<MaterialIcons name="logout" size={24} color="black" />} onPress={onLogout} />}
        </View>
        <View style={Platform.OS === 'ios'? { margin: 10, marginLeft: 20, paddingBottom:60 }:{ margin: 10, marginLeft: 20} }>
          <DrawerButton text='FEEDBACK' icon={<MaterialIcons name="email" size={24} color="black" />} onPress={() => openUrl('mailto:hello@climatemind.org')} />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 60,
    justifyContent: 'space-between',
  },
  textButton: {
    fontFamily: 'nunito-bold',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
});

export default CustomDrawerContent;