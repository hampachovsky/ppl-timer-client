'use server';
import { cookiesName, routesPath } from '@/common';
import { handleActionError, timerAPI } from '@/services';
import { StopTimerDto } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const fetchTimers = async () => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timers = await timerAPI.getAll(token);
      if (!timers) return { error: 'Нема таймерів', success: null };
      if (timers) return { success: timers, error: null };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймери');
  }
};

export const startTimer = async (id: string, intervalStart: Date) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timer = await timerAPI.startTimer(token, id, intervalStart);
      revalidatePath(routesPath.TIME_TRACKER);
      if (!timer) return { error: 'Нема таймеру' };
      if (timer) return { success: 'Таймер успішно запущено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};

export const stopTimer = async (id: string, dto: StopTimerDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timer = await timerAPI.stopTimer(token, id, dto);
      revalidatePath(routesPath.TIME_TRACKER);
      if (!timer) return { error: 'Нема таймеру' };
      if (timer) return { success: 'Таймер успішно зупинено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};
