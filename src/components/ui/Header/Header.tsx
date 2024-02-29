'use client';
import { cookiesName, routesPath } from '@/common';
import { userStore } from '@/store';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Header: React.FC = () => {
  const router = useRouter();
  const defaultTheme = getCookie(cookiesName.THEME);
  const [theme, setTheme] = React.useState(defaultTheme);

  const onLogout = () => {
    deleteCookie(cookiesName.IS_AUTH, { sameSite: 'none', secure: true });
    deleteCookie(cookiesName.TOKEN, { sameSite: 'none', secure: true });
    userStore.setState({
      data: null,
    });
    router.push(routesPath.LOGIN);
  };
  const handleChangeTheme = (e: React.MouseEvent<HTMLElement>, themeType: string) => {
    e.preventDefault();
    setTheme(themeType);
  };

  React.useEffect(() => {
    setCookie(cookiesName.THEME, theme, { sameSite: 'none', secure: true });
    router.refresh();
  }, [theme]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <EventNoteIcon sx={{ mx: 1, fontSize: 35 }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            PPLTimeTracker
          </Typography>

          {theme === 'dark' ? (
            <IconButton
              onClick={(e: React.MouseEvent<HTMLElement>) => handleChangeTheme(e, 'light')}
            >
              <ContrastOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={(e: React.MouseEvent<HTMLElement>) => handleChangeTheme(e, 'dark')}
            >
              <ContrastOutlinedIcon />
            </IconButton>
          )}

          <Button onClick={() => onLogout()} color='inherit'>
            Вийти
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
