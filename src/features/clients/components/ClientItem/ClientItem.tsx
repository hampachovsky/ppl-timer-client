'use client';
import { RowActions } from '@/components/ui';
import { deleteClient, updateClient } from '@/services/actions';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box, IconButton, ListItem, ListItemText, Tooltip } from '@mui/material';
import React from 'react';
import { EditClient } from '../EditClient';

type ClientItemProps = {
  clientName: string;
  clientEmail: string;
  clientNote: string;
  id: string;
  archived: boolean;
};

export const ClientItem: React.FC<ClientItemProps> = ({
  clientName,
  clientEmail,
  clientNote,
  id,
  archived,
}) => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = React.useCallback(() => {
    setIsEditMode(false);
  }, [isEditMode]);

  const handleArchiveClient = React.useCallback(
    async (clientId: string, clientArchived: boolean) => {
      await updateClient({
        id: clientId,
        archived: !clientArchived,
        clientName,
        clientNote,
        clientEmail,
      });
    },
    []
  );

  const handleDeleteClient = React.useCallback(async (clientId: string) => {
    await deleteClient(clientId);
  }, []);

  return (
    <Box key={id}>
      <ListItem
        sx={{ borderBottom: '1px  solid', borderColor: 'background.paper' }}
        secondaryAction={
          <Box>
            {clientNote.length > 0 && (
              <Tooltip title={clientNote}>
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
            )}
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
              id={id}
              handleArchive={handleArchiveClient}
              handleDelete={handleDeleteClient}
              archived={archived}
            />
          </Box>
        }
      >
        <ListItemText sx={{ padding: '6px' }} primary={clientName} secondary={clientEmail} />
      </ListItem>
      {isEditMode && (
        <EditClient
          handleCloseEdit={handleCloseEdit}
          isEditMode={isEditMode}
          client={{ clientName, clientEmail, clientNote, id, archived }}
        />
      )}
    </Box>
  );
};
