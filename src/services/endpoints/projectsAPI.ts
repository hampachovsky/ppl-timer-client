import { fetchClient } from '@/services';
import { CreateProjectDto, ProjectData } from '@/types';

export const projectsAPI = {
  async getAll(token: string): Promise<ProjectData[]> {
    const response = await fetchClient.request(
      `/projects/byUser`,
      { next: { revalidate: 3600, tags: ['/projects'] } },
      token
    );
    return response;
  },
  async create(token: string, createProjectDto: CreateProjectDto): Promise<ProjectData> {
    const response = await fetchClient.request(
      '/projects',
      {
        method: 'POST',
        body: JSON.stringify(createProjectDto),
      },
      token
    );

    return response;
  },
  async update(token: string, dto: Partial<ProjectData>): Promise<any> {
    const response = await fetchClient.request(
      `/projects/${dto.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ ...dto }),
      },
      token
    );
    return response;
  },
  async delete(token: string, id: string): Promise<any> {
    const response = await fetchClient.request(
      `/projects/${id}`,
      {
        method: 'DELETE',
      },
      token
    );
    return response;
  },
};
