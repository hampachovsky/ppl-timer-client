'use client';
import { updateTask } from '@/services/actions';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { ChangeEvent } from 'react';

type EditTaskProps = {
  isEditMode: boolean;
  text: string;
  id: string;
  handleCloseEdit: () => void;
};

export const EditTask: React.FC<EditTaskProps> = ({ isEditMode, text, id, handleCloseEdit }) => {
  const [open, setOpen] = React.useState<boolean>(isEditMode);
  const [task, setTask] = React.useState(text);

  const handleClose = () => {
    setOpen(false);
    handleCloseEdit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask(e.target.value);
  };

  const handleUpdateTask = async () => {
    await updateTask({ task, id });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box sx={{ backgroundColor: 'background.paper' }}>
        <DialogTitle>Редагувати задачу</DialogTitle>
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
            id='tag'
            name='tag'
            label='Задача'
            fullWidth
            variant='outlined'
            value={task}
            onChange={handleChange}
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
            onClick={handleUpdateTask}
            variant='contained'
            type='submit'
            disabled={!task.length}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
