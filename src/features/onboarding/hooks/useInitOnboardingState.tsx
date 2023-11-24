import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { completeOnboarding } from "../state/onboardingSlice";

function useInitOnboardingState() {
  const dispatch = useAppDispatch();
  const onboardingCompleted = useAppSelector(state => state.onboarding.onboardingCompleted);

  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboardingCompleted').then((result) => {
      if (result === 'true') {
        dispatch(completeOnboarding());
      } else {
        AsyncStorage.setItem('onboardingCompleted', 'false');
        setNeedsOnboarding(true);
      }

      setIsLoading(false);
    });
  });

  useEffect(() => {
    if (onboardingCompleted) {
      setNeedsOnboarding(false);
    }
  }, [onboardingCompleted])

  return {
    isLoading,
    needsOnboarding,
  };
}

export default useInitOnboardingState;
