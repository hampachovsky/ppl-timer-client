import { TrackerControl, TrackerList } from '@/features/timeTrackers';
import { Box } from '@mui/material';

const SomePage = () => {
  return (
    <Box>
      <TrackerControl />
      <TrackerList />
    </Box>
  );
};

export default SomePage;
