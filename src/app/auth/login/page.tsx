import { routesPath } from '@/common';
import { LoginForm } from '@/features/auth';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <>
      <Typography component='h1' variant='h5'>
        Вхід
      </Typography>
      <Avatar sx={{ my: 4, bgcolor: 'primary.main' }}>
        <LockIcon />
      </Avatar>
      <LoginForm />
      <Grid container sx={{ justifyContent: 'center' }}>
        <Typography variant='body1'>
          Немає аккаунту? <Link href={routesPath.REGISTER}>Створіть</Link>
        </Typography>
      </Grid>
    </>
  );
};

export default LoginPage;
