import { cookiesName, routesPath } from '@/common';
import { AppInitializer } from '@/components/lib/AppInitializer';
import { Header } from '@/components/ui';
import { SideMenu } from '@/features/sideMenu';
import { Box, Container } from '@mui/material';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const isAuth = getCookie(cookiesName.IS_AUTH, { cookies });

  if (!isAuth) {
    redirect(routesPath.LOGIN);
  }

  return (
    <AppInitializer>
      <Box>
        <Header />
        <Box display='flex'>
          <SideMenu />
          <Container sx={{ my: 10 }}>{children}</Container>
        </Box>
      </Box>
    </AppInitializer>
  );
};
