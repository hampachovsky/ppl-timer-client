'use client';
import { MenuSearchInput } from '@/components/ui';
import { useShowAssignMenu } from '@/features/timeTrackers';
import { useSearchMenuItems } from '@/hooks';
import { assignProjectToTimer } from '@/services';
import { ProjectData, TimerData } from '@/types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Chip, Divider, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

type ProjectPickerLabelProps = {
  fetchedProject: ProjectData[];
  assignedProject: TimerData['assignedProject'];
  timerId: string;
};

export const ProjectPickerLabel: React.FC<ProjectPickerLabelProps> = ({
  fetchedProject,
  assignedProject,
  timerId,
}) => {
  const { handleSearchMenuItem, searchText } = useSearchMenuItems();

  const { handleCloseMenu, handleOpenMenu, open, anchorEl } = useShowAssignMenu();

  const filteredProjects = fetchedProject?.filter((project) =>
    project.projectName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAssignProject = async (projectId: string | null) => {
    const res = await assignProjectToTimer(projectId, timerId);
    console.log(res);
  };

  return (
    <>
      {assignedProject === null ? (
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
      ) : (
        <Button
          variant='text'
          sx={{
            borderRadius: 0,
            height: '100%',
            color: assignedProject.color,
            textTransform: 'none',
          }}
          onClick={handleOpenMenu}
        >
          <Chip
            sx={{
              backgroundColor: assignedProject.color,
              height: '10px',
              width: '10px',
              mr: '0.2em',
            }}
          />
          <Typography sx={{ textWrap: { sx: 'wrap', md: 'nowrap' } }} variant={'body1'}>
            {assignedProject.projectName}
          </Typography>
        </Button>
      )}
      <Menu id='project-menu' anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuSearchInput handleSearch={handleSearchMenuItem} searchText={searchText} />
        {assignedProject !== null && (
          <div>
            <MenuItem onClick={() => handleAssignProject(null)}>Без проекту</MenuItem>
            <Divider />
          </div>
        )}
        {filteredProjects?.map((project) => (
          <MenuItem key={project.id} onClick={() => handleAssignProject(project.id)}>
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
