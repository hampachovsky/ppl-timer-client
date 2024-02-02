import { cookiesName, routesPath } from '@/common';
import { Box } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const AuthorizationLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuth = cookies().get(cookiesName.IS_AUTH);
  if (isAuth) {
    redirect(routesPath.TIME_TRACKER);
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};
