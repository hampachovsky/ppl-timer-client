import { RequestError } from '@/types';

export const handleActionError = (error: RequestError, notFoundText: string) => {
  if (error.status === 'ECONNREFUSED') {
    return { error: `проблеми з підключенням`, success: null };
  }
  if (error.status === 404) {
    return { error: `${notFoundText} не знайдений`, success: null };
  }

  return { error: 'Щось пішло не так', success: null };
};
