import { fetchClient } from '@/services';
import { TaskData } from '@/types';

export const taskAPI = {
  async create(task: string, projectId: string, token: string): Promise<TaskData> {
    const response = await fetchClient.request(
      '/tasks',
      {
        method: 'POST',
        body: JSON.stringify({ task, projectId: +projectId }),
      },
      token
    );

    return response;
  },
  async getAll(
    qs: string = '',
    type: string = 'all',
    projectId: string,
    token: string
  ): Promise<TaskData[]> {
    const response = await fetchClient.request(
      `/tasks/byProject/${projectId}?type=${type}&qs=${qs}`,
      { next: { revalidate: 3600, tags: ['/tasks'] } },
      token
    );
    return response;
  },
  async update(token: string, dto: Partial<TaskData>): Promise<any> {
    const response = await fetchClient.request(
      `/tasks/${dto.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ task: dto.task, completed: dto.completed }),
      },
      token
    );
    return response;
  },
  async delete(token: string, id: string): Promise<any> {
    const response = await fetchClient.request(
      `/tasks/${id}`,
      {
        method: 'DELETE',
      },
      token
    );
    return response;
  },
};
