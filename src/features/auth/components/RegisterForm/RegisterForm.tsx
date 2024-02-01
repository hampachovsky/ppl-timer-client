'use client';
import { routesPath } from '@/common';
import { FormField, RegisterDto, registerSchema } from '@/features/auth';
import { authAPI } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export const RegisterForm: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<RegisterDto> = async (data) => {
    const res = await authAPI.register(data);
    setCookie('pplTimerToken', res.token);
    console.log(res);
    reset();
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
            error={errors.email?.message}
            fieldKey='email'
            label='Електронна пошта'
            type='email'
          />
          <FormField
            error={errors.password?.message}
            fieldKey='password'
            label='Пароль'
            type='password'
          />
          <FormField
            error={errors.confirmPassword?.message}
            fieldKey='confirmPassword'
            label='Підтвердіть пароль'
            type='password'
          />

          <LoadingButton
            disabled={false}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={false}
          >
            Створити
          </LoadingButton>
        </form>
      </FormProvider>
      <Grid container justifyContent='center'>
        <Grid item>
          <Typography>
            Уже є аккаунт? <Link href={routesPath.LOGIN}>Увійдіть</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
