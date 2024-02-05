import { routesPath } from '@/common';
import { RegisterForm } from '@/features/auth';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const RegisterPage = async () => {
  return (
    <>
      <Typography component='h1' variant='h5'>
        Реєстрація
      </Typography>
      <Avatar sx={{ my: 4, bgcolor: 'primary.main' }}>
        <LockIcon />
      </Avatar>

      <RegisterForm />
      <Grid container justifyContent='center'>
        <Grid item>
          <Typography>
            Уже є аккаунт? <Link href={routesPath.LOGIN}>Увійдіть</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
