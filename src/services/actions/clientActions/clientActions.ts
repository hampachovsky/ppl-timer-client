'use server';

import { cookiesName, routesPath } from '@/common';
import { action } from '@/lib';
import { clientAPI, createClientSchema, handleActionError } from '@/services';
import { updateClientSchema } from '@/services/actionSchemas';
import { CreateClientDto, PageSearchParams, UpdateClientDto } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const createClient = action(createClientSchema, async (createClientDto: CreateClientDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const clients = await clientAPI.create(createClientDto, token);
      revalidateTag(routesPath.CLIENTS);
      revalidateTag('/project');
      revalidatePath(routesPath.PROJECTS);
      if (clients) return { success: clients };
      if (!clients) return { error: 'Нема Клієнту' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Клієнтів');
  }
});

export const fetchClients = async (
  searchParams: PageSearchParams['searchParams'] = { qs: '', type: '' }
) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const clients = await clientAPI.getAll(
        searchParams.qs as string,
        searchParams.type as string,
        token
      );
      if (!clients) return { error: 'Нема клієнтів' };
      if (clients) return { success: clients };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Клієнтів');
  }
};

export const updateClient = action(updateClientSchema, async (client: UpdateClientDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const clients = await clientAPI.update(token, client);
      revalidateTag(routesPath.CLIENTS);
      revalidateTag('/project');
      revalidatePath(routesPath.PROJECTS);
      if (!clients) return { error: 'Нема клієнта' };
      if (clients) return { success: 'Клієнта успішно оновлено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Клієнта');
  }
});

export const deleteClient = async (id: string) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const clients = await clientAPI.delete(token, id);
      revalidateTag(routesPath.CLIENTS);
      revalidateTag('/project');
      revalidatePath(routesPath.PROJECTS);
      if (!clients) return { error: 'Нема клієнта' };
      if (clients) return { success: 'Клієнта успішно видалено' };
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    return handleActionError(err, 'Клієнта');
  }
};
