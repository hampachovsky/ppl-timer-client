import { fetchClients } from '@/services/actions';
import { PageSearchParams } from '@/types';
import { Box, List, ListSubheader, Paper } from '@mui/material';
import React from 'react';
import { ClientItem } from '../ClientItem';

type ClientListProps = {
  params: PageSearchParams['params'];
  searchParams: PageSearchParams['searchParams'];
};

export const ClientList: React.FC<ClientListProps> = async ({ params, searchParams }) => {
  const data = await fetchClients(searchParams);

  if (data?.error) return <h1>{data.error}</h1>;
  if (data?.success) {
    return (
      <Paper sx={{ my: '1.5rem' }}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component='nav'
          subheader={
            <ListSubheader component='div' id='nested-client_list-subheader'>
              Назва
            </ListSubheader>
          }
        >
          <Box sx={{ backgroundColor: 'customBG.list' }}>
            {data.success.map((client) => (
              <ClientItem
                key={client.id}
                id={client.id}
                clientName={client.clientName}
                clientNote={client.clientNote}
                clientEmail={client.clientEmail}
                archived={client.archived}
              />
            ))}
          </Box>
        </List>
      </Paper>
    );
  }
};
