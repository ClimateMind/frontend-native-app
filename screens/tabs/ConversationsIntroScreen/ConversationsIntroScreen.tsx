import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationsStackParams } from '../../../navigation/ConversationsStack';

import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import BulletListItem from '../../../components/BulletListItem';
import Button_Shadow from '../../../ShadowStyles/Button_Shadow';

type Props = NativeStackScreenProps<ConversationsStackParams, 'ConversationsIntroScreen'>;

function ConversationsIntroScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <PageTitle>How to talk about Climate Change...</PageTitle>
      </View>

      <Text style={styles.smallText}>Talking about climate change is the most effective way to take action.</Text>

      <Text style={styles.header}>Step 1: Bond</Text>
      <Text style={styles.smallText}>Start your conversation by bonding over similarities in personal values and interests.</Text>
      <BulletListItem textStyle={styles.smallText}>Climate Mind helps with this by giving you a special link to the values questionnaire to share with others before you chat.</BulletListItem>

      <Text style={styles.header}>Step 2: Connect</Text>
      <Text style={styles.smallText}>Connect the dots for others on how your shared values relate to climate change.</Text>
      <BulletListItem textStyle={styles.smallText}>Climate Mind will find the connections so you don’t have to!</BulletListItem>
      
      <Text style={styles.header}>Step 3: Inspire</Text>
      <Text style={styles.smallText}>Motivate the other person with solutions they find attractive.</Text>
      <BulletListItem textStyle={styles.smallText}>Climate Mind has you covered for this one too!</BulletListItem>
      <View style={styles.button}>
      <Button_Shadow>
      <SimpleWhiteButton  text='START TALKING WITH PEOPLE' onPress={() => { navigation.navigate('ConversationsScreen') }} />
      </Button_Shadow>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(138, 213, 204, 0.4)',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    marginVertical: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingVertical: 20,
  },
  smallText: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  button: {
    marginTop: 30,
    marginBottom: 100,
  },
});

export default ConversationsIntroScreen;
