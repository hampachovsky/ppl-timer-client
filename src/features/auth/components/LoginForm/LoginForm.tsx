'use client';
import { routesPath } from '@/common';
import { FormField, LoginDto, loginSchema } from '@/features/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export const LoginForm: React.FC = () => {
  const methods = useForm<LoginDto>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    console.log(data);
  };
  return (
    <Box maxWidth='sm'>
      <FormProvider {...methods}>
        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
          <FormField
            error={errors.username?.message}
            fieldKey='username'
            label="Ім'я користувача"
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
