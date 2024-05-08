'use client';
import { deleteTask, updateTask } from '@/services/actions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { EditTask } from '../EditTask';

type TaskItemProps = {
  id: string;
  completed: boolean;
  task: string;
};

export const TaskItem: React.FC<TaskItemProps> = ({ id, completed, task }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [taskString, setTaskString] = React.useState(task);
  const [taskCompleted, setTaskCompleted] = React.useState(completed);
  const [touched, setTouched] = React.useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  React.useEffect(() => {
    const onCheck = async () => {
      await updateTask({ id, completed: taskCompleted });
      setTouched(false);
    };
    if (touched) {
      onCheck();
    }
  }, [taskCompleted]);

  const handleCloseEdit = React.useCallback(() => {
    setIsEditMode(false);
  }, [isEditMode]);

  const handleDeleteTask = async () => {
    await deleteTask(id);
    setOpenDialog(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleToggleComplete = async () => {
    setTaskCompleted(!taskCompleted);
    setTouched(true);
  };
  return (
    <Box>
      <ListItem
        secondaryAction={
          <Box>
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
            <IconButton
              sx={{
                borderRadius: 0,
                borderLeft: '1px  dashed',
                borderColor: 'background.paper',
              }}
              edge='end'
              aria-label='more'
              onClick={handleClickOpenDialog}
            >
              <DeleteIcon sx={{ fontSize: '25px' }} />
            </IconButton>
          </Box>
        }
      >
        <Checkbox onClick={handleToggleComplete} checked={taskCompleted} />
        <ListItemText
          sx={{
            borderBottom: '1px  solid',
            borderColor: 'background.paper',
            padding: '10px',
            textDecoration: taskCompleted ? 'line-through' : 'none',
            fontStyle: taskCompleted ? 'italic' : 'inherit',
            color: taskCompleted ? 'grey' : 'inherit',
          }}
          primary={task}
        />
      </ListItem>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'> Ви впевненні що хочете видалити задачу?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Ні</Button>
          <Button onClick={handleDeleteTask} sx={{ color: 'error.main' }}>
            Так
          </Button>
        </DialogActions>
      </Dialog>
      {isEditMode && (
        <EditTask handleCloseEdit={handleCloseEdit} isEditMode={isEditMode} text={task} id={id} />
      )}
    </Box>
  );
};
