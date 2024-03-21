'use client';
import { RowActions } from '@/components/ui';
import { EditTag } from '@/features/tags';
import { deleteTag, updateTag } from '@/services';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useCallback } from 'react';

type TagProps = {
  tagName: string;
  id: string;
  archived: boolean;
};

export const Tag: React.FC<TagProps> = ({ tagName, id, archived }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = useCallback(() => {
    setIsEditMode(false);
  }, [isEditMode]);

  const handleArchiveTag = React.useCallback(async (tagId: string, tagArchived: boolean) => {
    await updateTag({ tagName, id: tagId, archived: !tagArchived });
  }, []);

  const handleDeleteTag = React.useCallback(async (tagId: string) => {
    await deleteTag(tagId);
  }, []);

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
            <RowActions
              id={id}
              handleArchive={handleArchiveTag}
              handleDelete={handleDeleteTag}
              archived={archived}
            />
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
