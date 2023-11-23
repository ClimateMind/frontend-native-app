import { Platform } from 'react-native';
import { AnalyticsService } from './AnalyticsService';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
if (!BASE_URL) {
  throw new Error('Missing environment variable: EXPO_PUBLIC_API_URL');
}

export const analyticsService = new AnalyticsService(BASE_URL);
if (Platform.OS === 'ios') {
  analyticsService.setPlatform('mobile-ios');
} else if (Platform.OS === 'android') {
  analyticsService.setPlatform('mobile-android');
}

export * from './events';
