'use client';
import { routesPath } from '@/common';
import { FormField, LoginDto, loginSchema } from '@/features/auth';
import { authAPI } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export const LoginForm: React.FC = () => {
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

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    // TODO: add error handling, add zustand for state managment
    try {
      const res = await authAPI.login(data);
      setCookie('pplTimerToken', res.token);
      console.log(res);
      reset();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
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
      <Grid container sx={{ justifyContent: 'center' }}>
        <Typography variant='body1'>
          Немає аккаунту? <Link href={routesPath.REGISTER}>Створіть</Link>
        </Typography>
      </Grid>
    </Box>
  );
};
