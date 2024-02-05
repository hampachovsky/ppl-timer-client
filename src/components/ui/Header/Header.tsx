'use client';
import { cookiesName, routesPath } from '@/common';
import { userStore } from '@/store';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Header: React.FC = () => {
  const router = useRouter();

  const onLogout = () => {
    deleteCookie(cookiesName.IS_AUTH, { sameSite: 'none', secure: true });
    deleteCookie(cookiesName.TOKEN, { sameSite: 'none', secure: true });
    userStore.setState({
      data: null,
    });
    router.push(routesPath.LOGIN);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <EventNoteIcon sx={{ mx: 1, fontSize: 35 }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            PPLTimeTracker
          </Typography>
          <Button onClick={() => onLogout()} color='inherit'>
            Вийти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
