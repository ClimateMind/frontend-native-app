import { ScrollView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationsStackParams } from '../../../navigation/ConversationsStack';

import Colors from '../../../assets/colors';
import Headline2 from '../../../components/TextStyles/Headline2';
import BodyText from '../../../components/TextStyles/BodyText';
import BulletListItem from '../../../components/BulletListItem';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';

type Props = NativeStackScreenProps<ConversationsStackParams, 'ConversationsIntroScreen'>;

function ConversationsIntroScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Headline2 style={styles.marginBottom}>How to talk about Climate Change</Headline2>

      <BodyText style={styles.marginBottom}>Climate change is a global issue, and your contribution matters!</BodyText>
      
      <BodyText style={styles.marginBottom}>You don't need to be an expert to talk about climate change. Follow these easy steps to start having effective conversations:</BodyText>
      
      <BulletListItem>Reach out to a friend</BulletListItem>
      <BulletListItem>They'll pick an article to talk about with you</BulletListItem>
      <BulletListItem>Use the article to start a conversation</BulletListItem>
      <BulletListItem textStyle={styles.marginBottom}>Tell us how it went!</BulletListItem>

      <BodyText style={styles.marginBottom}>When you have conversations with others, you take part in a network of people around the world who are working together to find solutions.</BodyText>

      <SimpleWhiteButton style={styles.button} text='START TALKING WITH PEOPLE' onPress={() => { navigation.navigate('ConversationsScreen') }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeBright,
    paddingTop: 50,
    paddingHorizontal: 50,
  },
  marginBottom: {
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 100,
  },
});

export default ConversationsIntroScreen;
