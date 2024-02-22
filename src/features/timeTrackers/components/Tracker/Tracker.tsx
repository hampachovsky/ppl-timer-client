'use client';
import { TrackerListItem } from '@/features/timeTrackers';
import { TimerData } from '@/types';
import { Box, List } from '@mui/material';
import React, { useCallback } from 'react';

type TrackerProps = {
  tracker: TimerData;
};

export const Tracker: React.FC<TrackerProps> = ({ tracker }) => {
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
        handleOpenIntervalList={handleOpenIntervalList}
      />
      {open && (
        <List sx={{ width: '100%' }}>
          <Box>
            {tracker.timerIntervals.map((interval) => (
              <TrackerListItem
                isInterval
                key={interval.id}
                id={interval.id}
                timerName={tracker.timerName}
                timerSummary={interval.intervalDuration}
              />
            ))}
          </Box>
        </List>
      )}
    </Box>
  );
};
