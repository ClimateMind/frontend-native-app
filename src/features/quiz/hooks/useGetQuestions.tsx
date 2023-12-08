import { useEffect, useState } from 'react';

import { GetQuestions } from 'src/api/responses';
import useApiClient from 'src/hooks/useApiClient';

function useGetQuestions() {
  const apiClient = useApiClient();

  const [questionSets, setQuestionSets] = useState<GetQuestions>();

  useEffect(() => {
    // Fetch the questions on page load
    // and reverse them so that the last question is displayed first
    apiClient.getQuestions().then((result) => {
      const SetOne = result.SetOne.reverse();
      const SetTwo = result.SetTwo.reverse();
      setQuestionSets({ SetOne, SetTwo });
    });
  }, []);

  return { questionSets };
}

export default useGetQuestions;
