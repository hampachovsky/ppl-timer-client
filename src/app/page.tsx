import { Box, Button, Typography } from '@mui/material';

const SomePage = () => {
  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <Typography variant='h1'>Hello</Typography>
      <Button>Test</Button>
    </Box>
  );
};

export default SomePage;
