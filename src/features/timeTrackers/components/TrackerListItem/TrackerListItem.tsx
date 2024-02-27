'use client';
import { TrackerNameInput } from '@/features/timeTrackers';
import { formatTime } from '@/lib';
import { deleteTimer, startTimer } from '@/services';
import { TimerIntervalData } from '@/types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import React from 'react';

type TrackerListItemProps = {
  id: string;
  timerName: string;
  timerSummary: number;
  isInterval?: boolean;
  intervalCount?: number;
  isRunning?: boolean;
  timerId?: string;
  startedInterval?: TimerIntervalData;
  handleOpenIntervalList?: () => void;
};

export const TrackerListItem: React.FC<TrackerListItemProps> = ({
  timerName,
  timerSummary,
  id,
  intervalCount = 0,
  isRunning = false,
  startedInterval,
  timerId,
  isInterval = false,
  handleOpenIntervalList,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const trackerId = timerId ? timerId : id;

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenIntervalListClick = () => {
    handleOpenIntervalList && handleOpenIntervalList();
  };

  const handleStartTimer = async () => {
    await startTimer(trackerId, new Date());
  };

  const handleDeleteTracker = async () => {
    await deleteTimer(id, isInterval);
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
                onClick={handleOpenIntervalListClick}
              />
            )}
            <TrackerNameInput timerName={timerName} timerId={trackerId} />
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
              disabled={!!startedInterval}
              onClick={handleStartTimer}
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
              onClick={handleOpenMenu}
            >
              <MoreVertIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Grid>
          <Menu
            id='tags-basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Box component='div'>
              <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteTracker}>
                Видалити
              </MenuItem>
            </Box>
          </Menu>
        </Grid>
      </ListItem>
    </Box>
  );
};
