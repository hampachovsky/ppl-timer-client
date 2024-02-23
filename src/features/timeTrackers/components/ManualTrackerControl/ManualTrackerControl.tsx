import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import React from 'react';

export const ManualTrackerControl: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '0.7em' }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField fullWidth placeholder='Над чим працюєте?' />
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
          <Button sx={{ height: '100%' }} variant='contained'>
            Старт
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
