import { useState } from "react";
import { StyleSheet } from "react-native";
import * as Updates from 'expo-updates';

import { CmButton } from "src/shared/components";
import { useToastMessages } from "src/shared/hooks";

function UpdateButton() {
  const { showSuccessToast, showErrorToast } = useToastMessages();

  const [buttonText, setButtonText] = useState("Update App");
  const [isLoading, setIsLoading] = useState(false);

  // Check for new updates, and if available, download and install them
  async function updateApp() {
    setIsLoading(true);

    try {
      setButtonText("Checking for updates...");
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setButtonText("Updating App...");
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        showSuccessToast('App is up to date');
      }
    } catch (error) {
      showErrorToast('Error fetching latest Expo update');
    } finally {
      setIsLoading(false);
      setButtonText("Update App");
    }
  }

  return (
    <CmButton isLoading={isLoading} onPress={updateApp} text={buttonText} style={styles.button} />
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default UpdateButton;
