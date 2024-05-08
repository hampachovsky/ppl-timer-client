import { ListControl } from '@/features/list';
import { createTask } from '@/services/actions';
import { TaskData } from '@/types';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { TaskItem } from '../TaskItem';

type ProjectTasksProps = {
  tasks: TaskData[] | null;
  projectId: string;
};

export const ProjectTasks: React.FC<ProjectTasksProps> = ({ tasks, projectId }) => {
  const handleCreateTask = async (task: string) => {
    await createTask(task, projectId);
  };
  return (
    <div>
      <ListControl createItem={handleCreateTask} isClientControl={false} isTaskControl={true} />
      <Box sx={{ mt: '1.2em' }}>
        {tasks === null ? (
          <Typography variant='h6'>Задач немає</Typography>
        ) : (
          <>
            {tasks.map((task) => (
              <TaskItem key={task.id} id={task.id} completed={task.completed} task={task.task} />
            ))}
          </>
        )}
      </Box>
    </div>
  );
};
