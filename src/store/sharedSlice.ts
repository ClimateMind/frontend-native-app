import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SharedState {
  toastMessage: string;
  toastType: 'success' | 'error';
  toastShow: boolean;
}

const initialState: SharedState = {
  toastMessage: '',
  toastType: 'success',
  toastShow: false,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
      state.toastShow = true;
    },
    hideToast: (state) => {
      state.toastShow = false;
    },
  },
});

export const { showToast, hideToast } = sharedSlice.actions;
export default sharedSlice.reducer;
