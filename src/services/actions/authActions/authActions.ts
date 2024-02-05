'use server';
import { cookiesName } from '@/common';
import { LoginDto, RegisterDto, loginSchema } from '@/features/auth';
import { action } from '@/lib';
import { authAPI, handleActionError, placeholderSchema, registerActionSchema } from '@/services';
import { RequestError } from '@/types';
import { getCookie, setCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const loginAction = action(loginSchema, async (data: LoginDto) => {
  try {
    const response = await authAPI.login(data);

    revalidatePath('/auth/login');
    if (response.token && response.user) {
      setCookie(cookiesName.TOKEN, response.token, { cookies, sameSite: 'none', secure: true });
      setCookie(cookiesName.IS_AUTH, true, { cookies, sameSite: 'none', secure: true });

      return { success: response.user, error: null };
    }
  } catch (error: any) {
    const e = error as RequestError;
    return handleActionError(e, 'Користувач');
  }
});

export const registerAction = action(registerActionSchema, async (data: RegisterDto) => {
  try {
    const response = await authAPI.register(data);

    revalidatePath('/auth/register');
    if (response.token && response.user) {
      setCookie(cookiesName.TOKEN, response.token, { cookies, sameSite: 'none', secure: true });
      setCookie(cookiesName.IS_AUTH, true, { cookies, sameSite: 'none', secure: true });

      return { success: response.user, error: null };
    }
  } catch (error: any) {
    const e = error as RequestError;
    return handleActionError(e, 'Користувач');
  }
});

export const getUserAction = action(placeholderSchema, async () => {
  try {
    const token = getCookie(cookiesName.TOKEN, { cookies });
    const response = await authAPI.authMe(token!);
    revalidatePath('/');
    return { success: response, error: null };
  } catch (error: any) {
    const e = error as RequestError;
    throw new Error(e.statusText);
  }
});
