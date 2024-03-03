'use client';
import { stopTimer } from '@/services';
import { TimerData, TimerIntervalData } from '@/types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import { differenceInSeconds } from 'date-fns';
import React from 'react';
import { useStopwatch } from 'react-timer-hook';

type TimeTrackerControlProps = {
  startedTimer: TimerData;
  startedInterval: TimerIntervalData;
};

export const TimeTrackerControl: React.FC<TimeTrackerControlProps> = ({
  startedTimer,
  startedInterval,
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
    console.log(r);
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '0.7em' }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField fullWidth value={startedTimer.timerName} />
        </Grid>
        <Grid item>
          <Button
            variant='text'
            sx={{
              borderRadius: 0,
              height: '100%',
            }}
          >
            <AddCircleIcon sx={{ mr: 1 }} />
            Проект
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            sx={{
              borderRadius: 0,
              height: '100%',
              borderRight: '1px solid',
              borderLeft: '1px solid',
              borderColor: 'customBG.list',
            }}
          >
            <LocalOfferOutlinedIcon />
          </IconButton>
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
