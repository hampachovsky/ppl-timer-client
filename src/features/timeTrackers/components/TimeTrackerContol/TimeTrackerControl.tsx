'use client';
import { ProjectPickerLabel, TagNames, TrackerNameInput } from '@/features/timeTrackers';
import { stopTimer } from '@/services';
import { ProjectData, TagData, TimerData, TimerIntervalData } from '@/types';
import { Box, Button, Grid, TextField } from '@mui/material';
import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { useStopwatch } from 'react-timer-hook';

type TimeTrackerControlProps = {
  startedTimer: TimerData;
  startedInterval: TimerIntervalData;
  fetchedProject: ProjectData[];
  fetchedTags: TagData[];
};

export const TimeTrackerControl: React.FC<TimeTrackerControlProps> = ({
  startedTimer,
  startedInterval,
  fetchedProject,
  fetchedTags,
}) => {
  const stopwatchOffset = new Date();
  const secOffset = differenceInSeconds(startedInterval?.intervalStart, stopwatchOffset);
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + Math.abs(secOffset));
  const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: true,
      offsetTimestamp: stopwatchOffset,
    });

  const padTime = React.useCallback((number: number) => number.toString().padStart(2, '0'), []);

  const handleStopTimer = async () => {
    const r = await stopTimer(startedTimer.id, {
      intervalId: startedInterval.id,
      intervalEnd: new Date(),
      intervalDuration: totalSeconds,
    });
  };

  return (
    <Box sx={{ backgroundColor: 'customBG.list', padding: '0.7em', boxShadow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TrackerNameInput
            timerName={startedTimer.timerName}
            timerId={startedTimer.id}
            variant={'outlined'}
          />
        </Grid>
        <Grid item xs={2}>
          <ProjectPickerLabel
            assignedProject={startedTimer.assignedProject}
            timerId={startedTimer.id}
            fetchedProject={fetchedProject}
          />
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={3}>
          <TagNames
            timerId={startedTimer.id}
            timerTags={startedTimer.tags}
            fetchedTags={fetchedTags}
          />
        </Grid>

        <Grid xs={2} item>
          <TextField
            fullWidth
            value={`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`}
          />
        </Grid>
        <Grid justifyContent='end' item xs={1}>
          <Button
            sx={{ height: '100%', backgroundColor: 'error.main', width: '99%' }}
            variant='contained'
            onClick={handleStopTimer}
          >
            Зупинити
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
