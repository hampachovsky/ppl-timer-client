'use server';

import { cookiesName, routesPath } from '@/common';
import { action } from '@/lib';
import { clientAPI, createClientSchema, handleActionError } from '@/services';
import { CreateClientDto, PageSearchParams } from '@/types';
import { getCookie } from 'cookies-next';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const createClient = action(createClientSchema, async (createClientDto: CreateClientDto) => {
  const token = getCookie(cookiesName.TOKEN, { cookies });
  try {
    if (token) {
      const clients = await clientAPI.create(createClientDto, token);
      revalidateTag(routesPath.CLIENTS);
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
