import { updateClient } from '@/services/actions';
import { ClientData } from '@/types';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { useAction } from 'next-safe-action/hooks';
import React, { ChangeEvent } from 'react';

type EditClientProps = {
  isEditMode: boolean;
  client: ClientData;
  handleCloseEdit: () => void;
};

export const EditClient: React.FC<EditClientProps> = ({ isEditMode, client, handleCloseEdit }) => {
  const [open, setOpen] = React.useState<boolean>(isEditMode);
  const [clientName, setClientName] = React.useState(client.clientName);
  const [clientEmail, setClientEmail] = React.useState(client.clientEmail);
  const [clientNote, setClientNote] = React.useState(client.clientNote);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const { execute, result } = useAction(updateClient, {
    onSuccess: (data) => {
      handleClose();
    },
    onError: (e) => {
      if (e.serverError !== undefined) {
        setErrorMessage(e.serverError);
        setOpenSnackbar(true);
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
    handleCloseEdit();
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClientName(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClientEmail(e.target.value);
  };
  const handleChangeNote = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClientNote(e.target.value);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleUpdateClient = async () => {
    execute({ ...client, clientName, clientEmail, clientNote });
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box sx={{ backgroundColor: 'background.paper' }}>
          <DialogTitle>Редагувати клієнта</DialogTitle>
          <DialogContent
            sx={{
              borderTop: '1px  solid',
              borderColor: 'background.paper',
            }}
          >
            <TextField
              autoFocus
              required
              margin='dense'
              id='clientName'
              name='clientName'
              label="Ім'я клієнта"
              fullWidth
              variant='outlined'
              value={clientName}
              onChange={handleChangeName}
            />
            <TextField
              autoFocus
              required
              margin='dense'
              id='clientEmail'
              name='clientEmail'
              label='Пошта'
              fullWidth
              type='email'
              variant='outlined'
              value={clientEmail}
              onChange={handleChangeEmail}
            />
            <TextField
              margin='dense'
              id='clientNote'
              label='Нотатка'
              multiline
              fullWidth
              rows={4}
              value={clientNote}
              onChange={handleChangeNote}
            />
          </DialogContent>
          <DialogActions
            sx={{
              borderTop: '1px  solid',
              borderColor: 'background.paper',
            }}
          >
            <Button variant='text' onClick={handleClose}>
              Відмінити
            </Button>
            <Button
              onClick={handleUpdateClient}
              variant='contained'
              type='submit'
              disabled={!clientName.length || !clientEmail.length}
            >
              Зберегти
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleCloseSnackbar}
        open={openSnackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
