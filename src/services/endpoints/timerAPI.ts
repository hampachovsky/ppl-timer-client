import { fetchClient } from '@/services';
import { StopTimerDto, TimerData } from '@/types';

export const timerAPI = {
  async getAll(token: string): Promise<TimerData[]> {
    const response = await fetchClient.request(
      `/timers/byUser`,
      { next: { revalidate: 3600, tags: ['timers'] } },
      token
    );
    return response;
  },
  async startTimer(token: string, id: string, intervalStart: Date) {
    const response = await fetchClient.request(
      `/timers/startTimer/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ intervalStart: intervalStart }),
      },
      token
    );
    return response;
  },
  async stopTimer(token: string, id: string, dto: StopTimerDto) {
    const response = await fetchClient.request(
      `/timers/stopTimer/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          intervalId: +dto.intervalId,
          intervalEnd: dto.intervalEnd,
          intervalDuration: dto.intervalDuration,
        }),
      },
      token
    );
    return response;
  },
};
