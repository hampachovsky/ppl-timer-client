import { ClientList } from '@/features/clients';
import { PageSearchParams } from '@/types';
import { Typography } from '@mui/material';

const ClientsPage = ({ params, searchParams }: PageSearchParams) => {
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Typography sx={{ mb: 3 }} variant='h5'>
        Клієнти
      </Typography>
      {/*       <ListControl /> */}
      <ClientList params={params} searchParams={searchParams} />
    </div>
  );
};

export default ClientsPage;
