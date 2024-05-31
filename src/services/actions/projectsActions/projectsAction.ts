'use server';

import { cookiesName, routesPath } from '@/common';
import { handleActionError, projectsAPI } from '@/services';
import { CreateProjectDto, PageSearchParams, UpdateProjectDto } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const fetchProjects = async (
  searchParams: PageSearchParams['searchParams'] = { qs: '', type: '', client: '', billable: '' }
) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const projects = await projectsAPI.getAll(
        searchParams.qs as string,
        searchParams.type as string,
        searchParams.client as string,
        searchParams.billable as string,
        token
      );
      if (!projects) return { error: 'Нема проектів', success: null };
      if (projects) return { success: projects, error: null };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проекти');
  }
};

export const fetchProject = async (id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const project = await projectsAPI.getById(id, token);
      if (!project) return { error: 'Нема проекту', success: null };
      if (project) return { success: project, error: null };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проект');
  }
};

export const createProject = async (createProjectDto: CreateProjectDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const project = await projectsAPI.create(token, createProjectDto);
      revalidatePath(routesPath.PROJECTS);
      revalidateTag('/project');
      if (!project) return { error: 'Нема проекту' };
      if (project) return { success: project };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Проект');
  }
};

export const updateProject = async (dto: UpdateProjectDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const project = await projectsAPI.update(token, dto);
      revalidatePath(routesPath.PROJECTS);
      revalidateTag('/project');
      revalidateTag(routesPath.CLIENTS);
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
      revalidateTag('/project');
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
