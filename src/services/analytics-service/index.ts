import { AnalyticsService } from './AnalyticsService';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
if (!BASE_URL) {
  throw new Error('Missing environment variable: EXPO_PUBLIC_API_URL');
}

export const analyticsService = new AnalyticsService(BASE_URL);
export * from './events';
