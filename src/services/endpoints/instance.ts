import { AppConfig } from '@/common';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export const instance = axios.create({
  baseURL: AppConfig.apiUrl,
});

instance.interceptors.request.use((config) => {
  const token = getCookie('pplTimerToken');
  console.log('interceptor request', token);
  if (!!token && config.headers) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});
