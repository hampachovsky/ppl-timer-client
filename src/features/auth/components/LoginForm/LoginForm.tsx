'use client';
import { routesPath } from '@/common';
import { FormField, LoginDto, loginSchema } from '@/features/auth';
import { loginAction } from '@/services';
import { userStore } from '@/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useAction } from 'next-safe-action/hooks';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export const LoginForm: React.FC = () => {
  const { setUser } = userStore();
  const router = useRouter();

  const methods = useForm<LoginDto>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = methods;

  // TODO: ADD error handler
  const { execute, status } = useAction(loginAction, {
    onSuccess(data) {
      if (data?.error) throw new Error(data.error);
      if (data?.success) {
        setUser(data?.success);
        redirect(routesPath.TIME_TRACKER);
      }
    },
    onExecute(data) {
      console.log('start...');
    },
  });
  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    execute(data);
    reset();
  };
  return (
    <Box maxWidth='sm'>
      <FormProvider {...methods}>
        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
          <FormField
            error={errors.email?.message}
            fieldKey='email'
            label='Пошта'
            autoFocus={true}
          />
          <FormField
            error={errors.password?.message}
            fieldKey='password'
            label='Пароль'
            type='password'
          />
          <LoadingButton type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Увійти
          </LoadingButton>
        </form>
      </FormProvider>
    </Box>
  );
};
