'use server';
import { cookiesName, routesPath } from '@/common';
import { handleActionError, taskAPI } from '@/services';
import { PageSearchParams, TaskData } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const createTask = async (task: string, projectId: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tasks = await taskAPI.create(task, projectId, token);
      revalidatePath(routesPath.PROJECTS);
      revalidateTag('/tasks');
      revalidateTag('/project');
      if (tasks) return { success: tasks };
      if (!tasks) return { error: 'Нема задач' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Задача');
  }
};

export const fetchTasks = async (
  searchParams: PageSearchParams['searchParams'] = { qs: '', type: '' },
  projectId: string
) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tasks = await taskAPI.getAll(
        searchParams.qs as string,
        searchParams.type as string,
        projectId,
        token
      );
      if (!tasks) return { error: 'Нема задач' };
      if (tasks) return { success: tasks };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Задачі');
  }
};

export const updateTask = async (task: Partial<TaskData>) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tasks = await taskAPI.update(token, task);
      revalidatePath(routesPath.PROJECTS);
      revalidateTag('/tasks');
      revalidateTag('/project');
      if (!tasks) return { error: 'Нема задачі' };
      if (tasks) return { success: 'Задача успішно оновленно' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Задача');
  }
};

export const deleteTask = async (id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tasks = await taskAPI.delete(token, id);
      revalidatePath(routesPath.PROJECTS);
      revalidateTag('/tasks');
      revalidateTag('/project');
      if (!tasks) return { error: 'Нема задачі' };
      if (tasks) return { success: 'Задачу успішно видалено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Задача');
  }
};
