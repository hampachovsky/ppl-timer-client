'use server';
import { cookiesName } from '@/common';
import { handleActionError, timerAPI } from '@/services';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const fetchTimers = async () => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timers = await timerAPI.getAll(token);
      if (!timers) return { error: 'Нема таймерів' };
      if (timers) return { success: timers };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймери');
  }
};
