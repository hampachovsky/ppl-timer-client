'use client';
import { useDebounce } from '@/hooks';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect } from 'react';

export const TagsControl: React.FC = () => {
  const [filter, setFilter] = React.useState('active');
  const [tagName, setTagName] = React.useState('');
  const [queryString, setQueryString] = React.useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debouncedValue = useDebounce<string>(queryString, 500);
  const params = new URLSearchParams(searchParams);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    params.set('type', event.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (debouncedValue !== undefined || debouncedValue !== null) {
      params.set('qs', debouncedValue);
      replace(`${pathname}?${params.toString()}`);
      return;
    }
  }, [debouncedValue]);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQueryString(event.target.value);
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
            <MenuItem value={'all'}>Всі</MenuItem>
          </Select>
          <OutlinedInput
            sx={{
              ml: 2,
            }}
            type='search'
            placeholder='Пошук за назвою'
            value={queryString}
            onChange={handleSearch}
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
            value={tagName}
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
