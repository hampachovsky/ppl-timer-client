'use server';

import { cookiesName, routesPath } from '@/common';
import { handleActionError, projectsAPI } from '@/services';
import { CreateProjectDto, ProjectData } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
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

export const createProject = async (createProjectDto: CreateProjectDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const project = await projectsAPI.create(token, createProjectDto);
      revalidatePath(routesPath.PROJECTS);
      if (!project) return { error: 'Нема проекту' };
      if (project) return { success: project };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проект');
  }
};

export const updateProject = async (dto: Partial<ProjectData>) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const project = await projectsAPI.update(token, dto);
      revalidatePath(routesPath.PROJECTS);
      revalidatePath(routesPath.TIME_TRACKER);
      if (!project) return { error: 'Нема проекту' };
      if (project) return { success: 'Проект успішно оновленно' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проект');
  }
};

export const deleteProject = async (id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const response = await projectsAPI.delete(token, id);
      revalidatePath(routesPath.PROJECTS);
      revalidatePath(routesPath.TIME_TRACKER);
      if (!response) return { error: 'Помилка видалення' };
      if (response) return { success: 'Проект успішно видалено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проект');
  }
};
