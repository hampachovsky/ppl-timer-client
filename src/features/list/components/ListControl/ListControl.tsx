'use client';
import { TypeFilter } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { createClient } from '@/services/actions';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@mui/material';
import { useAction } from 'next-safe-action/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect } from 'react';

type ListControlProps = {
  isClientControl: boolean;
  createItem?: (name: string) => void;
};

export const ListControl: React.FC<ListControlProps> = ({ createItem, isClientControl }) => {
  const [filter, setFilter] = React.useState('active');
  const [itemName, setItemName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [isTouched, setIsTouched] = React.useState(false);
  const [queryString, setQueryString] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debouncedValue = useDebounce<string>(queryString, 500);
  const params = new URLSearchParams(searchParams);
  const { execute, result } = useAction(createClient, {
    onError: (e) => {
      if (e.serverError !== undefined) {
        setErrorMessage(e.serverError);
        setOpenSnackbar(true);
      }
    },
  });

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

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const onAddItem = () => {
    if (isClientControl === false && createItem) {
      createItem(itemName);
    } else {
      execute({ clientEmail, clientName: itemName });
      /*      if (status === 'hasErrored') {
        console.log(result.);
        setErrorMessage(result.data);
        setOpenSnackbar(true);
      } */
    }
    setItemName('');
    setClientEmail('');
  };
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={7} sm={7}>
          <TypeFilter filter={filter} handleChangeType={handleChangeType} />
          <OutlinedInput
            sx={{
              ml: 2,
              width: '30%',
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
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item xs={5} sm={5}>
          <TextField
            onChange={(e) => setItemName(e.target.value)}
            required
            value={itemName}
            label={isClientControl ? "Ім'я клієнту" : 'Додати тег'}
          />
          {isClientControl && (
            <TextField
              onChange={(e) => setClientEmail(e.target.value)}
              value={clientEmail}
              sx={{ ml: 1 }}
              required
              type='email'
              label={'Пошта'}
            />
          )}
          <Button onClick={() => onAddItem()} sx={{ ml: 2 }} variant='contained'>
            Додати
          </Button>
          <Snackbar
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClose={handleCloseSnackbar}
            open={openSnackbar}
            autoHideDuration={3000}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity='error'
              variant='filled'
              sx={{ width: '100%' }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
};
