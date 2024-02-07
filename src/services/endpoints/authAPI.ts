import { LoginDto, RegisterDto } from '@/features/auth';
import { fetchClient } from '@/services';
import { UserData, UserResponse } from '@/types';

export const authAPI = {
  async login(dto: LoginDto): Promise<UserResponse> {
    const response = await fetchClient.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    return response;
  },
  async register(dto: RegisterDto): Promise<UserResponse> {
    const response = await fetchClient.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response;
  },
  async authMe(token: string): Promise<UserData> {
    const response = await fetchClient.request('/users/me', {}, token);
    return response;
  },
};
