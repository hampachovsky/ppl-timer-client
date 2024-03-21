'use client';
import React from 'react';

export const useSearchMenuItems = () => {
  const [searchText, setSearchText] = React.useState('');

  const handleSearchMenuItem = React.useCallback((searchString: string) => {
    setSearchText(searchString);
  }, []);

  return { searchText, handleSearchMenuItem };
};
