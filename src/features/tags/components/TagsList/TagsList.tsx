import { Tag } from '@/features/tags';
import { Box, List, ListSubheader, Paper } from '@mui/material';
import React from 'react';

export const TagsList: React.FC = () => {
  return (
    <Paper sx={{ my: '1.5rem' }}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component='nav'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Назва
          </ListSubheader>
        }
      >
        <Box sx={{ backgroundColor: '#20242d' }}>
          <Tag text='Тег1' />
          <Tag text='Тег2' />
          <Tag text='Тег3' />
          <Tag text='Тег1' />
          <Tag text='Тег2' />
          <Tag text='Тег3' />
        </Box>
      </List>
    </Paper>
  );
};
