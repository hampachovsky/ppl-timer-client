import { RequestError } from '@/types';

export const handleActionError = (e: any, notFoundText: string) => {
  const error = e as RequestError;
  if (error.status === 'ECONNREFUSED') {
    return { error: `проблеми з підключенням`, success: null };
  }
  if (error.status === 404) {
    return { error: `${notFoundText} не знайденно`, success: null };
  }

  if (error.status === 401) {
    throw new Error('Unauthorized');
  }

  return { error: 'Щось пішло не так', success: null };
};
