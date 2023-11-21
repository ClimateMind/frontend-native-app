import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

interface OnboardingState {
  onboardingCompleted: boolean;
}

const initialState: OnboardingState = {
  onboardingCompleted: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
      AsyncStorage.setItem('onboardingCompleted', 'true');
    },
    resetOnboarding: (state) => {
      state.onboardingCompleted = false;
      AsyncStorage.setItem('onboardingCompleted', 'false');
    },
  },
});

export const {
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
