'use server';
import { cookiesName, routesPath } from '@/common';
import { tagsAPI } from '@/services';
import { getCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const createTag = async (tagName: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  if (token) {
    const tags = await tagsAPI.create(tagName, token);
    revalidatePath(routesPath.TAGS);
    if (!tags) return { error: 'No tags 😓' };
    if (tags) return { success: tags };
  } else {
    throw new Error('Нема токену');
  }
};

export const fetchTags = async () => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  if (token) {
    const tags = await tagsAPI.getAll(token);
    if (!tags) return { error: 'No tags 😓' };
    if (tags) return { success: tags };
  } else {
    throw new Error('Нема токену');
  }
};
