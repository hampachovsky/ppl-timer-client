import { Header } from '@/components/ui';
import { SideMenu } from '@/features';
import { Box, Container, Toolbar } from '@mui/material';

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Toolbar id='back-to-top-anchor' />
      <Box display='flex'>
        <SideMenu />
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};
