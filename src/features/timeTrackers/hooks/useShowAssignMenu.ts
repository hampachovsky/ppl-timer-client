'use client';
import React from 'react';

export const useShowAssignMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [touched, setTouched] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setTouched(false);
  };

  return { handleOpenMenu, handleCloseMenu, open, touched, setTouched, anchorEl };
};
