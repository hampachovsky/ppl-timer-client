import { fetchProjects } from '@/services';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
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
  if (projects?.error || projects?.success === null) return <h1>Error</h1>;
  console.log(projects?.success);
  return (
    <TableContainer sx={{ my: '1.5rem', boxShadow: 1 }} elevation={0} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='projects table'>
        <TableHead>
          <TableRow>
            <TableCell>Назва</TableCell>
            <TableCell align='right'>Клієнт</TableCell>
            <TableCell align='right'>Сумарний час</TableCell>
            <TableCell align='right'>Оплата</TableCell>
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
              <TableCell component='th' scope='row'>
                {row.projectName}
              </TableCell>
              <TableCell align='right'>{row.client.clientName}</TableCell>
              <TableCell align='right'>{row.hourlyRate}</TableCell>
              <TableCell align='right'>{row.billable}</TableCell>
              <TableCell align='right'>
                <IconButton
                  sx={{
                    borderRadius: 0,
                    borderLeft: '1px  dashed',
                    borderColor: 'background.paper',
                  }}
                  edge='end'
                  aria-label='more'
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
