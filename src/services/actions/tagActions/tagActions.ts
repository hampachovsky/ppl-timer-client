'use server';
import { cookiesName, routesPath } from '@/common';
import { handleActionError, tagsAPI } from '@/services';
import { TagData } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// TODO: ERROR MESAGE CONSTANT
export const createTag = async (tagName: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tags = await tagsAPI.create(tagName, token);
      revalidatePath(routesPath.TAGS);
      if (!tags) return { error: 'Нема тегів' };
      if (tags) return { success: tags };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Тег');
  }
};

export const updateTag = async (tag: TagData) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tags = await tagsAPI.update(token, tag);
      revalidatePath(routesPath.TAGS);
      if (!tags) return { error: 'Нема тегу' };
      if (tags) return { success: 'Тег успішно оновленно' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Тег');
  }
};

export const deleteTag = async (id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tags = await tagsAPI.delete(token, id);
      revalidatePath(routesPath.TAGS);
      if (!tags) return { error: 'Нема тегу' };
      if (tags) return { success: 'Тег успішно видалено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Тег');
  }
};

export const fetchTags = async () => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tags = await tagsAPI.getAll(token);
      if (!tags) return { error: 'Нема тегів' };
      if (tags) return { success: tags };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Тег');
  }
};
