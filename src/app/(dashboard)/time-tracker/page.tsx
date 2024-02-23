import { ManualTrackerControl, TimeTrackerControl, TrackerList } from '@/features/timeTrackers';
import { groupByWeek } from '@/lib';
import { fetchTimers } from '@/services';
import { Box } from '@mui/material';

const TimeTrackerPage = async () => {
  const timers = await fetchTimers();
  // TODO: Change error handling here
  if (!timers) return <h1>timers.error</h1>;
  if (!timers.success) return <h1>{timers.error}</h1>;
  const startedTimer = timers?.success.filter((timer) => timer.isRunning === true)[0];
  const startedInterval = startedTimer?.timerIntervals.filter(
    (interval) => interval.intervalEnd === null
  )[0];
  const groups = groupByWeek(timers?.success!);

  return (
    <Box>
      {startedTimer ? (
        <TimeTrackerControl startedInterval={startedInterval} startedTimer={startedTimer} />
      ) : (
        <ManualTrackerControl />
      )}
      {Object.keys(groups)
        .sort()
        .reverse()
        .map((week) => (
          <Box key={week}>
            <TrackerList week={week} trackers={groups[week]} />
          </Box>
        ))}
    </Box>
  );
};

export default TimeTrackerPage;
