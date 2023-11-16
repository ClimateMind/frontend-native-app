import axios from 'axios';
import { IAnalyticsEvent } from './IAnalyticsEvent';

export class AnalyticsService {
  private sessionId: string | undefined;

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  constructor(private readonly _baseUrl: string) {}

  public postEvent(analyticsEvent: IAnalyticsEvent, value?: string) {
    if (!this.sessionId) {
      throw new Error('SessionId is undefined');
    }

    if (!(analyticsEvent.label === 'session_id') && !value) {
      throw new Error('Value is undefined');
    }

    axios.post(`${this._baseUrl}/analytics`, {
      ...analyticsEvent,
      session_id: this.sessionId,
      value,
    });
  }
}
