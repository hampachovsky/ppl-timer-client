import { Header } from '@/components/ui';
import { SideMenu } from '@/features/sideMenu';
import { Box, Container } from '@mui/material';

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
