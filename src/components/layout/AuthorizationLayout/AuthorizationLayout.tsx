import { Box } from '@mui/material';

export const AuthorizationLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
