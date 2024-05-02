'use client';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

type TypeFilterProps = {
  filter: string;
  disableBorder?: boolean;
  handleChangeType: (filterType: string) => void;
};

export const TypeFilter: React.FC<TypeFilterProps> = ({
  filter,
  handleChangeType,
  disableBorder = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    handleChangeType(event.target.value);
  };

  const selectProps = {
    boxShadow: 'none',
    '.MuiOutlinedInput-notchedOutline': { border: 0 },
  };

  return (
    <Select
      id='select-items'
      value={filter}
      onChange={handleChange}
      sx={
        disableBorder
          ? {
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              width: '33%',
            }
          : { width: '20%' }
      }
    >
      <MenuItem value={'active'}>Активні</MenuItem>
      <MenuItem value={'archived'}>Архівовані</MenuItem>
      <MenuItem value={'all'}>Всі</MenuItem>
    </Select>
  );
};
