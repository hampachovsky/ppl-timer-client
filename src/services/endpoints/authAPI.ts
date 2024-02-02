import { LoginDto, RegisterDto } from '@/features/auth';
import { instance } from '@/services';
import { UserData, UserResponse } from '@/types';

export const authAPI = {
  async login(dto: LoginDto): Promise<UserResponse> {
    const response = await instance.post('/auth/login', dto);

    return response.data;
  },
  async register(dto: RegisterDto): Promise<UserResponse> {
    const response = await instance.post('/auth/register', dto);
    return response.data;
  },
  async authMe(): Promise<UserData> {
    const response = await instance.get('/users/me');
    return response.data;
  },
};
