'use client';
import { routesPath } from '@/common';
import { Box, Button, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
  const [isAuth, setAuth] = useState(false);
  if (isAuth) {
    redirect(routesPath.TIME_TRACKER);
  }
  return (
    <Box>
      <Typography variant='h1'>Login</Typography>
      <Button onClick={() => setAuth(true)}>Auth Test</Button>
    </Box>
  );
};

export default LoginPage;
