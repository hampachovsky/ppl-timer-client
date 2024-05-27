'use client';
import { MenuSearchInput } from '@/components/ui';
import { useShowAssignMenu } from '@/features/timeTrackers';
import { useSearchMenuItems } from '@/hooks';
import { updateTagsForTimer } from '@/services';
import { TagData } from '@/types';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import React from 'react';

type TagNamesProps = {
  timerId: string;
  timerTags: TagData[];
  fetchedTags: TagData[];
};

export const TagNames: React.FC<TagNamesProps> = ({ timerTags, fetchedTags, timerId }) => {
  const { handleSearchMenuItem, searchText } = useSearchMenuItems();
  const [tags, setTags] = React.useState(timerTags);
  const { handleCloseMenu, handleOpenMenu, open, setTouched, touched, anchorEl } =
    useShowAssignMenu();

  const [tagsToAssign, setTagsToAssign] = React.useState<TagData['id'][]>(
    timerTags.map((tag) => tag.id)
  );

  const tagNames = tags.map((tag) => `${tag.tagName}, `);

  const filteredTags = fetchedTags?.filter((tag) =>
    tag.tagName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCheckTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);

    const tagId = e.target.value;
    const isChecked = e.target.checked;

    let updatedTagsToAssign = [...tagsToAssign];

    if (isChecked) {
      updatedTagsToAssign.push(tagId);
    } else {
      updatedTagsToAssign = updatedTagsToAssign.filter((tag) => tag !== tagId);
    }

    setTagsToAssign(updatedTagsToAssign);

    const updatedTags = fetchedTags?.filter((tag) => updatedTagsToAssign.includes(tag.id));

    setTags(updatedTags);
  };

  const handleCloseSubmit = async () => {
    if (touched) {
      const result = await updateTagsForTimer(tagsToAssign, timerId);
      console.log(result);
    }
    handleCloseMenu();
  };

  return (
    <>
      <IconButton
        sx={{
          borderRadius: 0,
          height: '100%',
          borderRight: '1px dashed',
          borderLeft: '1px dashed',
          borderColor: 'background.paper',
        }}
        aria-controls={open ? 'tags-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
      >
        {tags.length > 0 ? (
          <Tooltip title={<>{...tagNames}</>}>
            <Box>
              <Chip
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 0,
                }}
                label={
                  <>
                    {tagNames.slice(0, 3).join(' ')}
                    {tagNames.length > 3 ? '...' : ''}
                  </>
                }
              />
            </Box>
          </Tooltip>
        ) : (
          <LocalOfferOutlinedIcon sx={{ fontSize: '30px' }} />
        )}
      </IconButton>
      <FormGroup>
        <Menu id='tags-menu' anchorEl={anchorEl} open={open} onClose={handleCloseSubmit}>
          <MenuSearchInput handleSearch={handleSearchMenuItem} searchText={searchText} />

          {filteredTags?.map((tag) => (
            <MenuItem key={tag.id}>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    checked={tags.some((t) => t.id === tag.id)}
                    onChange={handleCheckTag}
                    value={tag.id}
                  />
                }
                label={tag.tagName}
              />
            </MenuItem>
          ))}
        </Menu>
      </FormGroup>
    </>
  );
};
