'use client';
import { createTimer } from '@/services';
import { Alert, Box, Button, Grid, Snackbar, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

export const ManualTrackerControl: React.FC = () => {
  const [timerName, setTimerName] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimerName(e.target.value);
  };

  const handleTimerCreate = async () => {
    if (timerName.length > 0) {
      await createTimer(timerName);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'customBG.list',
        padding: '0.7em',
        boxShadow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            onChange={handleTextChange}
            fullWidth
            value={timerName}
            placeholder='Над чим працюєте?'
          />
        </Grid>
        <Grid xs={2} item>
          <TextField fullWidth value={'00:00:00'} />
        </Grid>
        <Grid justifyContent='end' item xs={1}>
          <Button onClick={handleTimerCreate} sx={{ height: '100%' }} variant='contained'>
            Старт
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleClose}
        open={open}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity='error' variant='filled' sx={{ width: '100%' }}>
          Введіть назву таймера
        </Alert>
      </Snackbar>
    </Box>
  );
};
