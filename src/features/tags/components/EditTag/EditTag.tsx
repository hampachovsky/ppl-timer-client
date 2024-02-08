'use client';
import { updateTag } from '@/services';
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

type EditTagProps = {
  isEditMode: boolean;
  text: string;
  id: string;
  archived: boolean;
  handleCloseEdit: () => void;
};

export const EditTag: React.FC<EditTagProps> = ({
  isEditMode,
  text,
  id,
  archived,
  handleCloseEdit,
}) => {
  const [open, setOpen] = React.useState<boolean>(isEditMode);
  const [tagName, setTagName] = React.useState(text);

  const handleClose = () => {
    setOpen(false);
    handleCloseEdit();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTagName(e.target.value);
  };

  const handleUpdateTag = async () => {
    await updateTag({ tagName, id, archived });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box sx={{ backgroundColor: 'background.paper' }}>
        <DialogTitle>Редагувати тег</DialogTitle>
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
            label='Назва тегу'
            fullWidth
            variant='outlined'
            defaultValue={tagName}
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
          <Button onClick={handleUpdateTag} variant='contained' type='submit'>
            Зберегти
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
