'use client';
import { createTag } from '@/services';
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
  const [tagName, setTagName] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  const onAddTag = async () => {
    await createTag(tagName);
    setTagName('');
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
          <TextField
            onChange={(e) => setTagName(e.target.value)}
            defaultValue={tagName}
            label='Додати тег'
          />
          <Button onClick={() => onAddTag()} sx={{ ml: 3 }} variant='contained'>
            Додати
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
