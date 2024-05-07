'use client';
import { ProjectNote, ProjectSettings } from '@/features/project';
import { ClientData, ExtendedProjectData } from '@/types';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

type ProjectPropsType = {
  project: ExtendedProjectData;
  clients: ClientData[];
};
export const Project: React.FC<ProjectPropsType> = ({ project, clients }) => {
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
          Задачі
        </TabPanel>
        <TabPanel sx={{ backgroundColor: 'customBG.list' }} value='note'>
          <ProjectNote id={project.id} note={project.note} />
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
