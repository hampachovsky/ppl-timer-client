import { fetchClient } from '@/services';
import { ClientData, CreateClientDto } from '@/types';

export const clientAPI = {
  async create(createClientDto: CreateClientDto, token: string): Promise<ClientData> {
    const response = await fetchClient.request(
      '/clients',
      {
        method: 'POST',
        body: JSON.stringify(createClientDto),
      },
      token
    );

    return response;
  },
  async getAll(qs: string = '', type: string = 'active', token: string): Promise<ClientData[]> {
    const response = await fetchClient.request(
      `/clients/byUser?type=${type}&qs=${qs}`,
      { next: { revalidate: 3600, tags: ['/clients'] } },
      token
    );
    return response;
  },
};
