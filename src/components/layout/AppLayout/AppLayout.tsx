import { cookiesName, routesPath } from '@/common';
import { Header } from '@/components/ui';
import { SideMenu } from '@/features/sideMenu';
import { Box, Container } from '@mui/material';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuth = getCookie(cookiesName.IS_AUTH, { cookies });
  if (!isAuth) {
    redirect(routesPath.LOGIN);
  }
  return (
    <Box>
      <Header />
      <Box display='flex'>
        <SideMenu />
        <Container sx={{ my: 10 }}>{children}</Container>
      </Box>
    </Box>
  );
};
