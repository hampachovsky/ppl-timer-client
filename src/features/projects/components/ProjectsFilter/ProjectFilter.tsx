'use client';
import { TypeFilter } from '@/components/ui';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import React from 'react';

export const ProjectFilter: React.FC = () => {
  const [filter, setFilter] = React.useState('active');

  const handleChangeFilterType = React.useCallback(
    (filterType: string) => {
      setFilter(filterType);
      console.log(filterType);
    },
    [filter]
  );

  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '0.7em' }}>
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
          >
            <OutlinedInput
              sx={{
                mb: 2,
              }}
              type='search'
              placeholder='Пошук за назвою'
              fullWidth
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <Divider />

            <MenuItem value={'all'}>
              <Checkbox />
              Всі клієнти
            </MenuItem>
            <MenuItem value={'none'}>Без клієнту</MenuItem>
            <MenuItem value={'clientA'}>Some client</MenuItem>
          </Select>

          <Select
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              width: '30%',
            }}
            id='select-billable'
            defaultValue={'default'}
          >
            <MenuItem value={'default'}>Оплата</MenuItem>
            <MenuItem value={'billable'}>З оплатою</MenuItem>
            <MenuItem value={'nonBillable'}>Не оплачується</MenuItem>
          </Select>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={2} sm={4}>
          <OutlinedInput
            sx={{
              ml: 2,
            }}
            type='search'
            placeholder='Пошук за назвою'
            fullWidth
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={2} sm={2}>
          <Button sx={{ ml: 3, maxHeight: '75px' }} variant='contained'>
            Примінити фільтри
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
