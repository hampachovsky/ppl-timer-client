'use client';
import { createTimer } from '@/services';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Alert, Box, Button, Grid, IconButton, Snackbar, TextField } from '@mui/material';
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
        backgroundColor: 'background.paper',
        padding: '0.7em',
        boxShadow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField
            onChange={handleTextChange}
            fullWidth
            value={timerName}
            placeholder='Над чим працюєте?'
          />
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
          <TextField fullWidth defaultValue={'00:00:00'} />
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
