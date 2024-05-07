import { RowActions } from '@/components/ui';
import { Project } from '@/features/project/';
import { deleteProject, fetchClients, fetchProject, updateProject } from '@/services/actions';
import { PageSearchParams } from '@/types';
import { Box, Typography } from '@mui/material';

const OneProjPage = async ({ params, searchParams }: PageSearchParams) => {
  const fetchedProject = await fetchProject(params.id);
  const clients = await fetchClients({ qs: '', type: 'active' });

  const handleArchiveProject = async (id: string, archived: boolean) => {
    'use server';
    await updateProject({ id, archived: !archived });
  };
  const handleDeleteProject = async (id: string) => {
    'use server';
    await deleteProject(id);
  };
  if (fetchedProject?.error || fetchedProject?.success === null || fetchedProject === undefined)
    return <h1>Проект не знайдено</h1>;
  if (clients?.error || clients?.success === null || clients?.success === undefined)
    return <h1>Помилка</h1>;
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} component={'div'}>
        <Typography sx={{ mb: 3 }} variant='h4'>
          Проект
        </Typography>

        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          component={'div'}
        >
          <Typography sx={{ mb: 3 }} variant='h6'>
            {fetchedProject?.success?.projectName}
            <Typography sx={{ mb: 3 }} variant='body2'>
              {fetchedProject?.success?.client !== null
                ? fetchedProject.success.client.clientName
                : ''}
            </Typography>
          </Typography>
          <Box sx={{ height: '20px' }}>
            <RowActions
              id={fetchedProject?.success.id}
              handleArchive={handleArchiveProject}
              handleDelete={handleDeleteProject}
              archived={fetchedProject?.success.archived}
            />
          </Box>
        </Box>
      </Box>
      <Project project={fetchedProject.success} clients={clients.success} />
    </div>
  );
};

export default OneProjPage;
