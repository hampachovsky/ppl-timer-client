'use client';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React from 'react';

export const TagsControl: React.FC = () => {
  const [filter, setFilter] = React.useState('active');

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            id='select-tags'
            value={filter}
            onChange={handleChange}
            sx={{
              borderRadius: 0,
            }}
          >
            <MenuItem value={'active'}>Активні</MenuItem>
            <MenuItem value={'archived'}>Архівовані</MenuItem>
            <MenuItem value={'Всі'}>Всі</MenuItem>
          </Select>
          <OutlinedInput
            sx={{
              ml: 2,
            }}
            type='search'
            placeholder='Пошук за назвою'
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={6}>
          <TextField label='Додати тег' />
          <Button sx={{ ml: 3 }} variant='contained'>
            Додати
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
