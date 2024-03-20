'use client';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';

type RowActionsProps = {
  archived: boolean;
  id: string;
  handleArchive: (id: string, archived: boolean) => void;
  handleDelete: (id: string) => void;
};

export const RowActions: React.FC<RowActionsProps> = ({
  archived,
  id,
  handleArchive,
  handleDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onArchiveClick = () => {
    handleArchive(id, archived);
    handleCloseMenu();
  };

  const onDeleteClick = () => {
    handleDelete(id);
    handleCloseMenu();
  };

  return (
    <>
      <IconButton
        sx={{
          borderRadius: 0,
          borderLeft: '1px  dashed',
          borderColor: 'background.paper',
        }}
        edge='end'
        aria-label='more'
        onClick={handleOpenMenu}
      >
        <MoreVertIcon sx={{ fontSize: '30px' }} />
      </IconButton>
      <Menu
        id='row-action-basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {archived ? (
          <Box component='div'>
            <MenuItem onClick={onArchiveClick}>Розархівувати</MenuItem>
            <MenuItem onClick={onDeleteClick} sx={{ color: 'error.main' }}>
              Видалити
            </MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={onArchiveClick}>Архівувати</MenuItem>
        )}
      </Menu>
    </>
  );
};
