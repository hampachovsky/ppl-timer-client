import { Box, List, ListSubheader, Paper } from '@mui/material';
import React from 'react';
import { Tracker } from '..';

export const TrackerList: React.FC = () => {
  return (
    <Paper sx={{ my: '1.5rem' }}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component='nav'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Сьогодні
          </ListSubheader>
        }
      >
        <Box sx={{ backgroundColor: 'customBG.list' }}>
          <Tracker />
          <Tracker />
          <Tracker />
        </Box>
      </List>
    </Paper>
  );
};
