import { StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationsStackParams } from 'src/navigation/Stacks/ConversationsStack';

import { StartTalkingEvent, analyticsService } from 'src/services';
import { CmTypography, CmButton, BulletListItem, Screen, Content, Section } from '@shared/components';

type Props = NativeStackScreenProps<ConversationsStackParams, 'ConversationsIntroScreen'>;

function ConversationsIntroScreen({ navigation }: Props) {
  function navigateToConversationsScreen() {
    analyticsService.postEvent(StartTalkingEvent);
    navigation.navigate('ConversationsScreen');
  }

  return (
    <Screen>
      <Section>
        <Content style={{ maxWidth: 400, alignItems: 'flex-start' }}>
          <CmTypography variant='h2' style={[styles.marginBottom, { alignSelf: 'center' }]}>How to talk about Climate Change</CmTypography>

          <CmTypography variant='body'>Climate change is a global issue, and your contribution matters!</CmTypography>

          <CmButton style={styles.button} text='START TALKING WITH PEOPLE' onPress={navigateToConversationsScreen} />

          <CmTypography variant='body' style={styles.marginBottom}>You don't need to be an expert to talk about climate change. Follow these easy steps to start having effective conversations:</CmTypography>
          
          <BulletListItem>Send a friend the link we provide</BulletListItem>
          <BulletListItem>They will pick an article to talk about with you</BulletListItem>
          <BulletListItem>Use the article to start a conversation</BulletListItem>
          <BulletListItem textStyle={styles.marginBottom}>Tell us how it went!</BulletListItem>

          <CmTypography variant='body' style={styles.marginBottom}>When you have conversations with others, you take part in a network of people around the world who are working together to find solutions.</CmTypography>
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
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default ConversationsIntroScreen;
