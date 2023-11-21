import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { completeOnboarding as setOnboardingToTrue, resetOnboarding as setOnboardingToFalse } from '../state/onboardingSlice';

function useOnboarding() {
  const dispatch = useAppDispatch();
  const onboardingCompleted = useAppSelector((state) => state.onboarding.onboardingCompleted);

  function completeOnboarding() {
    dispatch(setOnboardingToTrue());
  }

  function resetOnboarding() {
    dispatch(setOnboardingToFalse());
  }

  return {
    onboardingCompleted,
    completeOnboarding,
    resetOnboarding,
  };
}

export default useOnboarding;
