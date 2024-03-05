import { ProjectFilter, ProjectTable } from '@/features/projects';
import { PageSearchParams } from '@/types';
import { Typography } from '@mui/material';

const ProjectPage = ({ params, searchParams }: PageSearchParams) => {
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Typography sx={{ mb: 3 }} variant='h5'>
        Проекти
      </Typography>
      <ProjectFilter />
      <ProjectTable />
    </div>
  );
};

export default ProjectPage;
