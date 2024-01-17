import { useAppDispatch } from "src/store/hooks";
import { showToast } from "src/store/sharedSlice";

function useToastMessage() {
  const dispatch = useAppDispatch();

  function showSuccessToast(message: string) {
    dispatch(showToast({ message, type: 'success' }));
  }

  function showErrorToast(message: string) {
    dispatch(showToast({ message, type: 'error' }));
  }

  return {
    showSuccessToast,
    showErrorToast,
  };
}

export default useToastMessage;
