import { fetchClient } from '@/services';
import { ProjectData } from './../../types/index';

export const projectsAPI = {
  async getAll(token: string): Promise<ProjectData[]> {
    const response = await fetchClient.request(
      `/projects/byUser`,
      { next: { revalidate: 3600, tags: ['projects'] } },
      token
    );
    return response;
  },
};
