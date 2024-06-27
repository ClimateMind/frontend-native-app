import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { analyticsService } from 'src/services';

function useSkipAnalytics() {
  const [skipAnalytics, setSkipAnalytics] = useState(false);

  function skipAnalyticsCheckboxHandler() {
    const newValue = !skipAnalytics;
    analyticsService.trackAnalytics = newValue;
    AsyncStorage.setItem('trackAnalytics', newValue.toString());
    setSkipAnalytics(newValue);
  }

  useEffect(() => {
    AsyncStorage.getItem('trackAnalytics')
      .then((value) => {
        const isSkipAnalytics = value === 'true';
        analyticsService.trackAnalytics = !isSkipAnalytics;
        setSkipAnalytics(isSkipAnalytics);
      })
      .catch((error) => {
        console.error('Failed to load trackAnalytics from AsyncStorage', error);
      });
  }, []);

  return {
    skipAnalytics,
    skipAnalyticsCheckboxHandler,
  };
}

export default useSkipAnalytics;
