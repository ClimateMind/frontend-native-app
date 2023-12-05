import { useEffect } from 'react';
import useApiClient from 'src/hooks/useApiClient';

function useGetQuestions(
  setQuestionSets: (arg0: {
    SetOne: { id: number; value: string; question: string }[];
    SetTwo: { id: number; value: string; question: string }[];
  }) => void
) {
  const apiClient = useApiClient();

  useEffect(() => {
    // Fetch the questions on page load
    // and reverse them so that the last question is displayed first
    apiClient.getQuestions().then((result) => {
      const SetOne = result.SetOne.reverse();
      const SetTwo = result.SetTwo.reverse();
      setQuestionSets({ SetOne, SetTwo });
    });
  }, []);
}

export default useGetQuestions;
