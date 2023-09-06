import { StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationsStackParams } from '../../../navigation/Stacks/ConversationsStack';

import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';
import Headline2 from '../../../components/TextStyles/Headline2';
import BodyText from '../../../components/TextStyles/BodyText';
import BulletListItem from '../../../components/BulletListItem';
import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';

type Props = NativeStackScreenProps<ConversationsStackParams, 'ConversationsIntroScreen'>;

function ConversationsIntroScreen({ navigation }: Props) {
  return (
    <Screen>
      <Section>
        <Content style={{ maxWidth: 400, alignItems: 'flex-start' }}>
          <Headline2 style={[styles.marginBottom, { alignSelf: 'center' }]}>How to talk about Climate Change</Headline2>

          <BodyText style={styles.marginBottom}>Climate change is a global issue, and your contribution matters!</BodyText>

          <BodyText style={styles.marginBottom}>You don't need to be an expert to talk about climate change. Follow these easy steps to start having effective conversations:</BodyText>
          
          <BulletListItem>Send a friend the link we provide</BulletListItem>
          <BulletListItem>They will pick an article to talk about with you</BulletListItem>
          <BulletListItem>Use the article to start a conversation</BulletListItem>
          <BulletListItem textStyle={styles.marginBottom}>Tell us how it went!</BulletListItem>

          <BodyText style={styles.marginBottom}>When you have conversations with others, you take part in a network of people around the world who are working together to find solutions.</BodyText>

          <SimpleWhiteTextButton style={styles.button} text='START TALKING WITH PEOPLE' onPress={() => { navigation.navigate('ConversationsScreen') }} />
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 100,
    alignSelf: 'center',
  },
});

export default ConversationsIntroScreen;
