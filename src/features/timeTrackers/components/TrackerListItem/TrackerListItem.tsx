'use client';
import { formatTime } from '@/lib';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { Box, Button, Chip, Divider, Grid, IconButton, ListItem, TextField } from '@mui/material';
import React from 'react';

type TrackerListItemProps = {
  id: string;
  timerName: string;
  timerSummary: number;
  isInterval?: boolean;
  intervalCount?: number;
  handleOpenIntervalList?: () => void;
};

export const TrackerListItem: React.FC<TrackerListItemProps> = ({
  timerName,
  timerSummary,
  id,
  intervalCount = 0,
  isInterval = false,
  handleOpenIntervalList,
}) => {
  const handleClick = () => {
    handleOpenIntervalList && handleOpenIntervalList();
  };
  return (
    <Box sx={{ backgroundColor: isInterval ? 'customBG.intervalItem' : '' }} key={id}>
      <Divider sx={{ borderColor: 'background.paper' }} />
      <ListItem>
        <Grid container spacing={1} sx={{ px: '0.5em' }}>
          <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={3} md={4}>
            {intervalCount > 0 && (
              <Chip
                sx={{
                  witdh: '10%',
                  borderRadius: '5px',
                  backgroundColor: 'background.paper',
                }}
                label={intervalCount}
                onClick={handleClick}
              />
            )}
            <TextField
              sx={{
                width: '90%',
                ml: '0.5em',
              }}
              variant='standard'
              value={timerName}
              InputProps={{ disableUnderline: true }}
            />
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
            <TextField value={formatTime(timerSummary)} />
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
