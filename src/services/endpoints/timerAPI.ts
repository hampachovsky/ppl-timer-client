import { fetchClient } from '@/services';
import { StopTimerDto, TagData, TimerData } from '@/types';

export const timerAPI = {
  async getAll(token: string): Promise<TimerData[]> {
    const response = await fetchClient.request(
      `/timers/byUser`,
      { next: { revalidate: 3600, tags: ['timers'] } },
      token
    );
    return response;
  },
  async create(timerName: string, token: string): Promise<TimerData> {
    const response = await fetchClient.request(
      '/timers',
      {
        method: 'POST',
        body: JSON.stringify({ timerName }),
      },
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

  async update(token: string, dto: Partial<TimerData>): Promise<any> {
    const response = await fetchClient.request(
      `/timers/${dto.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ ...dto }),
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

  async delete(token: string, id: string): Promise<any> {
    const response = await fetchClient.request(
      `/timers/${id}`,
      {
        method: 'DELETE',
      },
      token
    );
    return response;
  },

  async deleteInterval(token: string, id: string): Promise<any> {
    const response = await fetchClient.request(
      `/intervals/${id}`,
      {
        method: 'DELETE',
      },
      token
    );
    return response;
  },

  async updateTagsForTimer(token: string, dto: TagData['id'][], id: string): Promise<any> {
    const response = await fetchClient.request(
      `/timers/updateTagsForTimer/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ tagIds: dto }),
      },
      token
    );
    return response;
  },
};
