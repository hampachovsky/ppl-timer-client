import { CreateProjectModal, ProjectFilter, ProjectTable } from '@/features/projects';
import { fetchClients } from '@/services/actions';
import { PageSearchParams } from '@/types';
import { Box, Typography } from '@mui/material';

const ProjectPage = async ({ params, searchParams }: PageSearchParams) => {
  const clients = await fetchClients({ qs: '', type: 'active' });
  if (clients?.error || clients?.success === null || clients?.success === undefined)
    return <h1>Помилка</h1>;
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} component={'div'}>
        <Typography sx={{ mb: 3 }} variant='h5'>
          Проекти
        </Typography>
        <CreateProjectModal clients={clients?.success} />
      </Box>
      <ProjectFilter />
      <ProjectTable />
    </div>
  );
};

export default ProjectPage;
