import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';

type MenuSearchInputProps = {
  searchText: string;
  handleSearch: (value: string) => void;
};

export const MenuSearchInput: React.FC<MenuSearchInputProps> = ({ searchText, handleSearch }) => {
  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleSearch(e.target.value);
  };
  return (
    <Box sx={{ padding: '0.3rem' }}>
      <OutlinedInput
        sx={{
          mb: 2,
        }}
        type='search'
        placeholder='Пошук за назвою'
        fullWidth
        value={searchText}
        onChange={handleSearchItem}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
      />
      <Divider />
    </Box>
  );
};
