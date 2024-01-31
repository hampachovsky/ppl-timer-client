import { RegisterForm } from '@/features/auth';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Typography } from '@mui/material';

const LoginPage = () => {
  return (
    <>
      <Typography component='h1' variant='h5'>
        Реєстрація
      </Typography>
      <Avatar sx={{ my: 4, bgcolor: 'primary.main' }}>
        <LockIcon />
      </Avatar>

      <RegisterForm />
    </>
  );
};

export default LoginPage;
