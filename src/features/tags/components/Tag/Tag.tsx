'use client';
import { EditTag } from '@/features/tags';
import { deleteTag, updateTag } from '@/services';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useCallback } from 'react';

type TagProps = {
  tagName: string;
  id: string;
  archived: boolean;
};

export const Tag: React.FC<TagProps> = ({ tagName, id, archived }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = useCallback(() => {
    setIsEditMode(false);
  }, [isEditMode]);

  const handleArchive = async () => {
    await updateTag({ tagName, id, archived: !archived });
    handleClose();
  };

  const handleDelete = async () => {
    await deleteTag(id);
    handleClose();
  };

  return (
    <Box key={id}>
      <ListItem
        secondaryAction={
          <Box>
            <IconButton
              sx={{
                borderRadius: 0,
                borderLeft: '1px  solid',
                mx: 1,
                borderColor: 'background.paper',
              }}
              edge='end'
              aria-label='edit'
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ borderRadius: 0, borderLeft: '1px  solid', borderColor: 'background.paper' }}
              edge='end'
              aria-label='more'
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='tags-basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {archived ? (
                <Box component='div'>
                  <MenuItem onClick={handleArchive}>Розархівувати</MenuItem>
                  <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
                    Видалити
                  </MenuItem>
                </Box>
              ) : (
                <MenuItem onClick={handleArchive}>Архівувати</MenuItem>
              )}
            </Menu>
          </Box>
        }
      >
        <ListItemButton sx={{ borderBottom: '1px  solid', borderColor: 'background.paper' }}>
          <ListItemText primary={tagName} />
        </ListItemButton>
      </ListItem>
      {isEditMode && (
        <EditTag
          handleCloseEdit={handleCloseEdit}
          isEditMode={isEditMode}
          text={tagName}
          id={id}
          archived={archived}
        />
      )}
    </Box>
  );
};
