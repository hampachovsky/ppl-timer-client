'use server';
import { cookiesName } from '@/common';
import { LoginDto, RegisterDto, loginSchema } from '@/features/auth';
import { action } from '@/lib';
import { authAPI, registerActionSchema } from '@/services';
import { setCookie } from 'cookies-next';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const loginAction = action(loginSchema, async (data: LoginDto) => {
  try {
    const response = await authAPI.login(data);

    revalidatePath('/');
    if (response.token && response.user) {
      setCookie(cookiesName.TOKEN, response.token, { cookies, sameSite: 'none', secure: true });
      setCookie(cookiesName.IS_AUTH, true, { cookies, sameSite: 'none', secure: true });

      return { success: response.user };
    }
  } catch (error: any) {
    if (error.response.data.statusCode === 404) {
      return { error: 'Користувач не знайдений' };
    } else {
      return { error: 'Щось пішло не так' };
    }
  }
});

export const registerAction = action(registerActionSchema, async (data: RegisterDto) => {
  try {
    const response = await authAPI.register(data);

    revalidatePath('/');
    if (response.token && response.user) {
      setCookie(cookiesName.TOKEN, response.token, { cookies, sameSite: 'none', secure: true });
      setCookie(cookiesName.IS_AUTH, true, { cookies, sameSite: 'none', secure: true });

      return { success: response.user };
    }
  } catch (error: any) {
    if (error.response.data.statusCode === 404) {
      return { error: 'Користувач не знайдений' };
    } else {
      return { error: 'Щось пішло не так' };
    }
  }
});
