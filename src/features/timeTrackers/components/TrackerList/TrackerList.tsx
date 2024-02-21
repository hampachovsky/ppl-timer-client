import { Tracker } from '@/features/timeTrackers';
import { TimerData } from '@/types';
import { Box, List, ListSubheader, Paper } from '@mui/material';
import React from 'react';

type TrackerListProps = {
  week: string;
  trackers: TimerData[];
};

export const TrackerList: React.FC<TrackerListProps> = ({ week, trackers }) => {
  console.log(trackers);
  return (
    <Paper sx={{ my: '1.5rem' }}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component='nav'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            {week}
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
