import { fetchClient } from '@/services';
import { TagData } from '@/types';

export const tagsAPI = {
  async create(tagName: string, token: string): Promise<TagData> {
    const response = await fetchClient.request(
      '/tags',
      {
        method: 'POST',
        body: JSON.stringify({ tagName }),
      },
      token
    );

    return response;
  },
  async getAll(token: string): Promise<TagData[]> {
    const response = await fetchClient.request(
      '/tags/byUser',
      { next: { revalidate: 3600 } },
      token
    );
    return response;
  },
};
