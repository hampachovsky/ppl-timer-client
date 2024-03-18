import { ManualTrackerControl, TimeTrackerControl, TrackerList } from '@/features/timeTrackers';
import { groupByWeek } from '@/lib';
import { fetchTags, fetchTimers } from '@/services';
import { Box } from '@mui/material';

const TimeTrackerPage = async () => {
  const timers = await fetchTimers();
  const fetchedTags = await fetchTags({ type: 'active' });

  // TODO: Change error handling here
  if (!timers) return <h1>timers.error</h1>;
  if (!timers.success) return <h1>{timers.error}</h1>;
  if (!fetchedTags) return <h1>fetchedTags.error</h1>;
  if (!fetchedTags.success) return <h1>{fetchedTags?.error}</h1>;
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
            <TrackerList
              fetchedTags={fetchedTags.success}
              week={week}
              trackers={groups[week]}
              startedInterval={startedInterval}
            />
          </Box>
        ))}
    </Box>
  );
};

export default TimeTrackerPage;
