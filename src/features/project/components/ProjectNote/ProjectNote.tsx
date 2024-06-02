'use client';
import { updateProject } from '@/services';
import { Alert, Box, Snackbar, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

type ProjectNoteProps = {
  id: string;
  note: string;
  clientId: string | null;
};

export const ProjectNote: React.FC<ProjectNoteProps> = ({ id, note, clientId }) => {
  const [projectNote, setProjectNote] = React.useState(note);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState('');

  const handleChangeNote = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectNote(e.target.value);
  };

  const handleUpdateProjectNote = async () => {
    let res;
    if (note !== projectNote) {
      clientId !== null
        ? (res = await updateProject({ note: projectNote, id, clientId: +clientId }))
        : (res = await updateProject({ note: projectNote, id }));
      if (res?.success) {
        setResponseMessage(res.success);
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Box>
      <TextField
        margin='dense'
        id='projectNote'
        label='Нотатка'
        multiline
        fullWidth
        rows={4}
        value={projectNote}
        onChange={handleChangeNote}
        onBlur={handleUpdateProjectNote}
      />
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleCloseSnackbar}
        open={openSnackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
