import { SideMenuList } from '@/features/sideMenu/';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

export const SideMenu: React.FC = () => {
  const sideMenuWidthMd = 240;
  const sideMenuWidthSm = 150;
  const sideMenuWidthXs = 120;
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant='permanent'
        sx={{
          width: { md: sideMenuWidthMd, sm: sideMenuWidthSm, xs: sideMenuWidthXs },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: { md: sideMenuWidthMd, sm: sideMenuWidthSm, xs: sideMenuWidthXs },
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <SideMenuList />
        </Box>
      </Drawer>
    </Box>
  );
};
