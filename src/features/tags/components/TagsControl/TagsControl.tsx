'use client';
import { TypeFilter } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { createTag } from '@/services';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect } from 'react';

export const TagsControl: React.FC = () => {
  const [filter, setFilter] = React.useState('active');
  const [tagName, setTagName] = React.useState('');
  const [isTouched, setIsTouched] = React.useState(false);
  const [queryString, setQueryString] = React.useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debouncedValue = useDebounce<string>(queryString, 500);
  const params = new URLSearchParams(searchParams);

  const handleChangeType = React.useCallback(
    (filterType: string) => {
      setFilter(filterType);
      params.set('type', filterType);
      replace(`${pathname}?${params.toString()}`);
    },
    [filter]
  );

  useEffect(() => {
    if ((debouncedValue !== undefined || debouncedValue !== null) && isTouched) {
      params.set('qs', debouncedValue);
      replace(`${pathname}?${params.toString()}`);
      setIsTouched(false);
      return;
    }
  }, [debouncedValue]);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsTouched(true);
    setQueryString(event.target.value);
  };

  const onAddTag = async () => {
    await createTag(tagName);
    setTagName('');
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={7} sm={6}>
          <TypeFilter filter={filter} handleChangeType={handleChangeType} />
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
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={3} sm={6}>
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
