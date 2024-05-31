'use client';
import { ProjectNote, ProjectSettings, ProjectTasks } from '@/features/project';
import { ClientData, ExtendedProjectData, TaskData } from '@/types';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

type ProjectPropsType = {
  project: ExtendedProjectData;
  clients: ClientData[];
  fetchedTasks: TaskData[] | null;
};
export const Project: React.FC<ProjectPropsType> = ({ project, clients, fetchedTasks }) => {
  const [value, setValue] = React.useState('settings');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{ backgroundColor: 'background.paper' }}
            value={value}
            onChange={handleChange}
            aria-label='navigation tabs'
          >
            <Tab label='Задачі' value={'tasks'} />
            <Tab label='Нотатка' value={'note'} />
            <Tab label='Налаштування' value={'settings'} />
          </Tabs>
        </Box>
        <TabPanel sx={{ backgroundColor: 'customBG.list' }} value='tasks'>
          <ProjectTasks tasks={fetchedTasks} projectId={project.id} />
        </TabPanel>
        <TabPanel sx={{ backgroundColor: 'customBG.list' }} value='note'>
          <ProjectNote id={project.id} note={project.note} clientId={project.client.id} />
        </TabPanel>
        <TabPanel sx={{ backgroundColor: 'customBG.list' }} value='settings'>
          <ProjectSettings
            id={project.id}
            projectBillable={project.billable}
            client={project.client}
            projectColor={project.color}
            projectHourlyRate={project.hourlyRate}
            projectName={project.projectName}
            clients={clients}
          />
        </TabPanel>
      </Box>
    </TabContext>
  );
};
