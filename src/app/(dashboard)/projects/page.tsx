import { CreateProjectModal, ProjectsFilter } from '@/features/projects';
import { ProjectsTable } from '@/features/projects/components/ProjectsTable/ProjectsTable';
import { fetchClients } from '@/services/actions';
import { PageSearchParams } from '@/types';
import { Box, Typography } from '@mui/material';

const ProjectPage = async ({ params, searchParams }: PageSearchParams) => {
  const clients = await fetchClients({ qs: '', type: 'active' });

  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} component={'div'}>
        <Typography sx={{ mb: 3 }} variant='h5'>
          Проекти
        </Typography>
        <CreateProjectModal clients={clients?.success!} />
      </Box>
      <ProjectsFilter clients={clients?.success!} />
      <ProjectsTable params={params} searchParams={searchParams} />
    </div>
  );
};

export default ProjectPage;
