import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

type TagProps = {
  text: string;
  id: string;
  archived: boolean;
};

export const Tag: React.FC<TagProps> = ({ text, id, archived }) => {
  return (
    <ListItem
      key={id}
      secondaryAction={
        <Box>
          <IconButton
            sx={{ borderRadius: 0, borderLeft: '1px #1b1e26 solid', mx: 1 }}
            edge='end'
            aria-label='delete'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ borderRadius: 0, borderLeft: '1px #1b1e26 solid' }}
            edge='end'
            aria-label='delete'
          >
            <ArchiveIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemButton sx={{ borderBottom: '1px #1b1e26 solid' }}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
