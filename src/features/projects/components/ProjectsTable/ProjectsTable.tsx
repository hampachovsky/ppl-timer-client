import { routesPath } from '@/common';
import { RowActions } from '@/components/ui';
import { formatTime } from '@/lib';
import { deleteProject, fetchProjects, updateProject } from '@/services';
import { PageSearchParams, ProjectData } from '@/types';
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
import Link from 'next/link';
import React from 'react';

type ProjectTableProps = {
  params: PageSearchParams['params'];
  searchParams: PageSearchParams['searchParams'];
};

export const ProjectsTable: React.FC<ProjectTableProps> = async ({ params, searchParams }) => {
  const projects = await fetchProjects(searchParams);
  let totalTimeInHours = 0;

  const handleArchiveProject = async (id: string, archived: boolean) => {
    'use server';
    await updateProject({ id, archived: !archived });
  };
  const handleDeleteProject = async (id: string) => {
    'use server';
    await deleteProject(id);
  };

  function calculateTime(arr: ProjectData['timers'], field: keyof ProjectData['timers'][0]) {
    let total = 0;

    arr.forEach((obj) => {
      const fieldValue = obj[field].toString();
      total += parseInt(fieldValue);
    });

    const formattedTime = formatTime(total);

    const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
    const timeInHours = hours + minutes / 60 + seconds / 3600;
    totalTimeInHours = timeInHours;

    return formattedTime;
  }

  if (projects?.error || projects?.success === null) return <h1>Проекти не знайдено</h1>;
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
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href={`${routesPath.PROJECTS}/${row.id}`}
                >
                  <Chip
                    sx={{ backgroundColor: row.color, height: '10px', width: '10px', mr: '0.6em' }}
                  />
                  {row.projectName}
                </Link>
              </TableCell>
              <TableCell align='center'>
                {row.client !== null ? row.client.clientName : '—'}
              </TableCell>
              <TableCell align='center'>{calculateTime(row.timers, 'timerSummary')}</TableCell>
              <TableCell align='center'>
                {row.billable ? `${(totalTimeInHours * row.hourlyRate).toFixed(2)}` : '0.00'}
                ($)
              </TableCell>
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
