'use server';

import { cookiesName } from '@/common';
import { handleActionError, projectsAPI } from '@/services';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const fetchProjects = async () => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const projects = await projectsAPI.getAll(token);
      if (!projects) return { error: 'Нема проектів', success: null };
      if (projects) return { success: projects, error: null };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проекти');
  }
};
