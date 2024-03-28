'use server';
import { cookiesName, routesPath } from '@/common';
import { handleActionError, timerAPI } from '@/services';
import { StopTimerDto, TagData, TimerData } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const fetchTimers = async () => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timers = await timerAPI.getAll(token);
      if (timers.length) {
        return { success: timers, error: null };
      }
      return { error: 'Нема таймерів', success: null };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймери');
  }
};

export const createTimer = async (timerName: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timer = await timerAPI.create(timerName, token);
      revalidatePath(routesPath.TIME_TRACKER);
      if (!timer) return { error: 'Нема таймерів' };
      if (timer) return { success: timer };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
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
      revalidateTag(routesPath.TAGS);
      if (!timer) return { error: 'Нема таймеру' };
      if (timer) return { success: 'Таймер успішно зупинено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};

export const updateTimer = async (dto: Partial<TimerData>) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timer = await timerAPI.update(token, dto);
      revalidatePath(routesPath.TIME_TRACKER);
      if (!timer) return { error: 'Нема таймеру' };
      if (timer) return { success: 'Таймер успішно оновленно' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};

export const updateTagsForTimer = async (dto: TagData['id'][], id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const timer = await timerAPI.updateTagsForTimer(token, dto, id);
      revalidatePath(routesPath.TIME_TRACKER);
      revalidateTag(routesPath.TAGS);
      if (!timer) return { error: 'Нема таймеру' };
      if (timer) return { success: 'Таймер успішно оновленно' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};

export const assignProjectToTimer = async (projectId: string | null, id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const projId = projectId !== null ? +projectId : null;
      const timer = await timerAPI.assignProjectToTimer(token, projId, id);
      revalidatePath(routesPath.TIME_TRACKER);
      revalidateTag(routesPath.PROJECTS);
      if (!timer) return { error: 'Нема таймеру' };
      if (timer) return { success: 'Таймер успішно оновленно' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};

export const deleteTimer = async (id: string, isInterval = false) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      if (isInterval) {
        const response = await timerAPI.deleteInterval(token, id);
        revalidatePath(routesPath.TIME_TRACKER);
        if (!response) return { error: 'Нема інтервалу' };
        if (response) return { success: 'Інтервал успішно видалено' };
      } else {
        const response = await timerAPI.delete(token, id);
        revalidatePath(routesPath.TIME_TRACKER);
        if (!response) return { error: 'Нема таймеру' };
        if (response) return { success: 'Таймер успішно видалено' };
      }
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Таймер');
  }
};
