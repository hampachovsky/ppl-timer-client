import { routesPath } from '@/common';
import { Header } from '@/components/ui';
import { SideMenu } from '@/features/sideMenu';
import { Box, Container } from '@mui/material';
import { redirect } from 'next/navigation';

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuth = true;

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
