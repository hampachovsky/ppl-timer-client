import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { Box, Button, Divider, Grid, IconButton, ListItem, TextField } from '@mui/material';
import React from 'react';

export const Tracker: React.FC = () => {
  return (
    <Box>
      <Divider sx={{ borderColor: 'background.paper' }} />
      <ListItem>
        <Grid container spacing={1}>
          <Grid item xs={3} md={4}>
            <TextField fullWidth placeholder='Над чим працюєте?' />
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              variant='text'
              sx={{
                borderRadius: 0,
                height: '100%',
              }}
            >
              <AddCircleIcon sx={{ pr: '3px', fontSize: '30px' }} />
              Проект
            </Button>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={2} md={2}>
            <IconButton
              sx={{
                borderRadius: 0,
                height: '100%',
                borderRight: '1px dashed',
                borderLeft: '1px dashed',
                borderColor: 'background.paper',
              }}
            >
              <LocalOfferOutlinedIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={2} md={3}>
            <TextField defaultValue={'00:00:00'} />
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={3} md={1}>
            <IconButton
              sx={{
                borderRadius: 0,
                height: '100%',
                borderLeft: '1px dashed',
                borderColor: 'background.paper',
              }}
            >
              <PlayArrowOutlinedIcon sx={{ fontSize: '30px' }} />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: 0,
                height: '100%',
                borderLeft: '1px dashed',
                borderColor: 'background.paper',
              }}
              edge='end'
              aria-label='more'
            >
              <MoreVertIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    </Box>
  );
};
