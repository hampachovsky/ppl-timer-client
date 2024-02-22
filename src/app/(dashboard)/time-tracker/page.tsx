import { TrackerControl, TrackerList } from '@/features/timeTrackers';
import { groupByWeek } from '@/lib';
import { fetchTimers } from '@/services';
import { Box } from '@mui/material';

const TimeTrackerPage = async () => {
  const timers = await fetchTimers();
  const groups = groupByWeek(timers?.success!);
  return (
    <Box>
      <TrackerControl />
      {Object.keys(groups).map((week) => (
        <Box key={week}>
          <TrackerList week={week} trackers={groups[week]} />
        </Box>
      ))}
    </Box>
  );
};

export default TimeTrackerPage;
