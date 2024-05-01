'use client';
import { RowActions } from '@/components/ui';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box, IconButton, ListItem, ListItemText, Tooltip } from '@mui/material';
import React from 'react';

export const ClientItem: React.FC = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = React.useCallback(() => {
    setIsEditMode(false);
  }, [isEditMode]);

  const handleArchiveClient = React.useCallback(
    async (clientId: string, clientArchived: boolean) => {
      console.log('archive test');
    },
    []
  );

  const handleDeleteClient = React.useCallback(async (clientId: string) => {
    console.log('delete test');
  }, []);
  return (
    <Box>
      <ListItem
        sx={{ borderBottom: '1px  solid', borderColor: 'background.paper' }}
        secondaryAction={
          <Box>
            <Tooltip title=' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, necessitatibus?'>
              <IconButton
                sx={{
                  borderRadius: 0,
                  mx: 1,
                  borderColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <EventNoteIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              sx={{
                borderRadius: 0,
                borderLeft: '1px  solid',
                mx: 1,
                borderColor: 'background.paper',
              }}
              edge='end'
              aria-label='edit'
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
            <RowActions
              id={'0'}
              handleArchive={handleArchiveClient}
              handleDelete={handleDeleteClient}
              archived={false}
            />
          </Box>
        }
      >
        <ListItemText
          sx={{ padding: '6px' }}
          primary={'clientName'}
          secondary={'client@gmail.com'}
        />
      </ListItem>
    </Box>
  );
};
