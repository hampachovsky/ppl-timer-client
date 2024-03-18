'use server';
import { cookiesName, routesPath } from '@/common';
import { handleActionError, tagsAPI } from '@/services';
import { PageSearchParams, TagData } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// TODO: ERROR MESAGE CONSTANT
export const createTag = async (tagName: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tags = await tagsAPI.create(tagName, token);
      revalidateTag(routesPath.TAGS);
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
      revalidateTag(routesPath.TAGS);
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
      revalidateTag(routesPath.TAGS);
      if (!tags) return { error: 'Нема тегу' };
      if (tags) return { success: 'Тег успішно видалено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Тег');
  }
};

export const fetchTags = async (
  searchParams: PageSearchParams['searchParams'] = { qs: '', type: '' }
) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const tags = await tagsAPI.getAll(
        searchParams.qs as string,
        searchParams.type as string,
        token
      );
      if (!tags) return { error: 'Нема тегів' };
      if (tags) return { success: tags };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Тегів');
  }
};
