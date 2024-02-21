import { fetchClient } from '@/services';
import { TimerData } from '@/types';

export const timerAPI = {
  async getAll(token: string): Promise<TimerData[]> {
    const response = await fetchClient.request(
      `/timers/byUser`,
      { next: { revalidate: 3600 } },
      token
    );
    return response;
  },
};
