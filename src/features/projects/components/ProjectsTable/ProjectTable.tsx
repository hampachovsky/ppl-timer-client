import { RowActions } from '@/components/ui';
import { deleteProject, fetchProjects, updateProject } from '@/services';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

export const ProjectTable: React.FC = async () => {
  const projects = await fetchProjects();

  const handleArchiveProject = async (id: string, archived: boolean) => {
    'use server';
    await updateProject({ id, archived: !archived });
  };
  const handleDeleteProject = async (id: string) => {
    'use server';
    await deleteProject(id);
  };

  if (projects?.error || projects?.success === null) return <h1>Error</h1>;
  return (
    <TableContainer sx={{ my: '1.5rem', boxShadow: 1 }} elevation={0} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='projects table'>
        <TableHead>
          <TableRow>
            <TableCell>Назва</TableCell>
            <TableCell align='center'>Клієнт</TableCell>
            <TableCell align='center'>Сумарний час</TableCell>
            <TableCell align='center'>Оплата</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.success.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: 'customBG.list',
              }}
            >
              <TableCell>
                <Chip
                  sx={{ backgroundColor: row.color, height: '10px', width: '10px', mr: '0.6em' }}
                />
                {row.projectName}
              </TableCell>
              <TableCell align='center'>
                {row.client !== null ? row.client.clientName : '—'}
              </TableCell>
              <TableCell align='center'>Сумарний час</TableCell>
              <TableCell align='center'>{row.hourlyRate}</TableCell>
              <TableCell align='right'>
                <RowActions
                  id={row.id}
                  handleArchive={handleArchiveProject}
                  handleDelete={handleDeleteProject}
                  archived={row.archived}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
