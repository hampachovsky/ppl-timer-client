'use client';
import { TrackerListItem } from '@/features/timeTrackers';
import { ProjectData, TagData, TimerData, TimerIntervalData } from '@/types';
import { Box, List } from '@mui/material';
import React, { useCallback } from 'react';

type TrackerProps = {
  tracker: TimerData;
  startedInterval: TimerIntervalData;
  fetchedTags: TagData[];
  fetchedProject: ProjectData[];
};

export const Tracker: React.FC<TrackerProps> = ({
  tracker,
  startedInterval,
  fetchedTags,
  fetchedProject,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpenIntervalList = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <Box>
      <TrackerListItem
        key={tracker.id}
        id={tracker.id}
        timerName={tracker.timerName}
        timerSummary={tracker.timerSummary}
        intervalCount={tracker.timerIntervals.length}
        isRunning={tracker.isRunning}
        tags={tracker.tags}
        handleOpenIntervalList={handleOpenIntervalList}
        startedInterval={startedInterval}
        fetchedTags={fetchedTags}
        fetchedProject={fetchedProject}
      />
      {open && (
        <List sx={{ width: '100%' }}>
          <Box>
            {tracker.timerIntervals.map((interval) => (
              <TrackerListItem
                isInterval
                tags={tracker.tags}
                key={interval.id}
                id={interval.id}
                timerId={tracker.id}
                timerName={tracker.timerName}
                timerSummary={interval.intervalDuration}
                isRunning={tracker.isRunning}
                startedInterval={startedInterval}
                fetchedTags={fetchedTags}
                fetchedProject={fetchedProject}
              />
            ))}
          </Box>
        </List>
      )}
    </Box>
  );
};
