import { Alert, Linking } from "react-native";

async function openUrl(url: string) {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Cannot open unsupported url: ${url}`);
  }
}

export { openUrl };