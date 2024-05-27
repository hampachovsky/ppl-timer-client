'use client';
import { MenuSearchInput, TypeFilter } from '@/components/ui';
import { useSearchMenuItems } from '@/hooks';
import { ClientData } from '@/types';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type ProjectFilterProps = {
  clients: ClientData[];
};

export const ProjectsFilter: React.FC<ProjectFilterProps> = ({ clients }) => {
  const [filter, setFilter] = React.useState('active');
  const [selectedClient, setSelectedClient] = React.useState<string>('all');
  const [billableFilter, setBillableFilter] = React.useState<string>('all');
  const [queryString, setQueryString] = React.useState<string>('');
  const { handleSearchMenuItem, searchText } = useSearchMenuItems();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChangeFilterType = React.useCallback(
    (filterType: string) => {
      setFilter(filterType);
    },
    [filter]
  );

  const filteredClients = clients?.filter((client) =>
    client.clientName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectClients = (event: SelectChangeEvent) => {
    setSelectedClient(event.target.value);
  };

  const onApplyFilter = () => {
    params.set('qs', queryString);
    params.set('type', filter);
    params.set('client', selectedClient);
    params.set('billable', billableFilter);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: 1,
        padding: '0.7em',
      }}
    >
      <Grid container>
        <Grid sx={{ boxSizing: 'border-box', flexWrap: 'nowrap' }} item xs={5} sm={6}>
          <TypeFilter
            disableBorder={true}
            filter={filter}
            handleChangeType={handleChangeFilterType}
          />

          <Select
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              width: '34%',
            }}
            id='select-client'
            defaultValue={'all'}
            onChange={handleSelectClients}
          >
            <MenuSearchInput handleSearch={handleSearchMenuItem} searchText={searchText} />

            <MenuItem value={'all'}>Всі клієнти</MenuItem>
            <MenuItem value={'none'}>Без клієнту</MenuItem>
            <Divider />
            {filteredClients?.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.clientName}
              </MenuItem>
            ))}
          </Select>

          <Select
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              width: '30%',
            }}
            id='select-billable'
            value={billableFilter}
            onChange={(e) => setBillableFilter(e.target.value)}
          >
            <MenuItem value={'all'}>Оплата</MenuItem>
            <MenuItem value={'billable'}>З оплатою</MenuItem>
            <MenuItem value={'nonBillable'}>Не оплачується</MenuItem>
          </Select>
        </Grid>
        <Grid
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
          item
          xs={2}
          sm={4}
        >
          <OutlinedInput
            sx={{
              height: '80%',
            }}
            type='search'
            placeholder='Пошук за назвою'
            fullWidth
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          item
          xs={2}
          sm={2}
        >
          <Button
            sx={{ height: '80%', width: { sm: '100%', md: '80%' }, ml: 1 }}
            variant='contained'
            onClick={onApplyFilter}
          >
            Примінити фільтри
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
