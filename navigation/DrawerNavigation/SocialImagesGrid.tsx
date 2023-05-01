import { FlatList, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../assets/colors';
import { openUrl } from '../../utils';

function SocialImagesGrid() {
  const images = [
    { key: 1, icon: <Ionicons onPress={() => openUrl('https://www.facebook.com/climatemindorg')} name="logo-facebook" size={24} color="white" /> },
    { key: 2, icon: <Ionicons onPress={() => openUrl('https://www.instagram.com/climatemind/')} name="logo-instagram" size={24} color="white" /> },
    { key: 3, icon: <Ionicons onPress={() => openUrl('https://twitter.com/Climate_Mind')} name="logo-twitter" size={24} color="white" /> },
    { key: 4, icon: <Ionicons onPress={() => openUrl('https://www.linkedin.com/company/climate-mind/')} name="logo-linkedin" size={24} color="white" /> },
    { key: 5, icon: <Ionicons onPress={() => openUrl('https://github.com/ClimateMind')} name="logo-github" size={24} color="white" /> },
    { key: 6, icon: <FontAwesome5 onPress={() => openUrl('https://t.me/climatemind_chat')} name="telegram-plane" size={24} color="white" /> },
  ];
  
  return (
    <FlatList
      data={images}
      numColumns={3}
      renderItem={(item) => <View style={styles.item}>{item.item.icon}</View>}
      style={{ marginLeft: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    maxWidth: '33%',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: Colors.themeBright,
    borderRadius: 1000,
  },
});

export default SocialImagesGrid;
