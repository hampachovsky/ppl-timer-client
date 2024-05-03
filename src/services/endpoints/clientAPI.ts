import { fetchClient } from '@/services';
import { ClientData, CreateClientDto, UpdateClientDto } from '@/types';

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

  async update(token: string, dto: UpdateClientDto): Promise<any> {
    const response = await fetchClient.request(
      `/clients/${dto.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(dto),
      },
      token
    );
    return response;
  },
  async delete(token: string, id: string): Promise<any> {
    const response = await fetchClient.request(
      `/clients/${id}`,
      {
        method: 'DELETE',
      },
      token
    );
    return response;
  },
};
