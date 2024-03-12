import { CreateProjectModal, ProjectFilter, ProjectTable } from '@/features/projects';
import { PageSearchParams } from '@/types';
import { Box, Typography } from '@mui/material';

const ProjectPage = ({ params, searchParams }: PageSearchParams) => {
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} component={'div'}>
        <Typography sx={{ mb: 3 }} variant='h5'>
          Проекти
        </Typography>
        <CreateProjectModal />
      </Box>
      <ProjectFilter />
      <ProjectTable />
    </div>
  );
};

export default ProjectPage;
