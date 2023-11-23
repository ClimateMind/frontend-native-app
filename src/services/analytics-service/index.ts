import { Platform } from 'react-native';
import { AnalyticsService } from './AnalyticsService';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
if (!BASE_URL) {
  throw new Error('Missing environment variable: EXPO_PUBLIC_API_URL');
}

export const analyticsService = new AnalyticsService(BASE_URL);
if (Platform.OS === 'ios') {
  analyticsService.setSource('mobile-ios');
} else if (Platform.OS === 'android') {
  analyticsService.setSource('mobile-android');
}

export * from './events';
