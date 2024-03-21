'use client';
import { MenuSearchInput } from '@/components/ui';
import { useShowAssignMenu } from '@/features/timeTrackers';
import { useSearchMenuItems } from '@/hooks';
import { ProjectData } from '@/types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Chip, Divider, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

type ProjectPickerLabelProps = {
  fetchedProject: ProjectData[];
};

export const ProjectPickerLabel: React.FC<ProjectPickerLabelProps> = ({ fetchedProject }) => {
  const { handleSearchMenuItem, searchText } = useSearchMenuItems();

  const { handleCloseMenu, handleOpenMenu, open, anchorEl } = useShowAssignMenu();

  const filteredProjects = fetchedProject.filter((project) =>
    project.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Button
        variant='text'
        sx={{
          borderRadius: 0,
          height: '100%',
        }}
        onClick={handleOpenMenu}
      >
        <AddCircleIcon sx={{ pr: '3px', fontSize: '30px' }} />
        Проект
      </Button>
      <Menu id='project-menu' anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuSearchInput handleSearch={handleSearchMenuItem} searchText={searchText} />
        <MenuItem>Без проекту</MenuItem>
        <Divider />
        {filteredProjects.map((project) => (
          <MenuItem key={project.id}>
            <>
              <Chip
                sx={{ backgroundColor: project.color, height: '10px', width: '10px', mr: '0.6em' }}
              />
              <Typography variant={'body1'} sx={{ color: project.color }}>
                {project.projectName}
              </Typography>
            </>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
