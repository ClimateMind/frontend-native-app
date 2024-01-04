import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { analyticsService } from 'src/services';

function useSkipAnalytics() {
  const [skipAnalytics, setSkipAnalytics] = useState(false);

  function skipAnalyticsCheckboxHandler() {
    analyticsService.trackAnalytics = skipAnalytics;
    AsyncStorage.setItem('trackAnalytics', (skipAnalytics).toString());
    setSkipAnalytics(current => !current);
  }

  useEffect(() => {
    AsyncStorage.getItem('trackAnalytics', (value) => {
      if (value) {
        setSkipAnalytics(true);
      }
    })
  }, []);

  return {
    skipAnalytics,
    skipAnalyticsCheckboxHandler,
  }
}

export default useSkipAnalytics
