'use client';
import { updateTagsForTimer } from '@/services';
import { TagData } from '@/types';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import React from 'react';

type TagNamesProps = {
  timerId: string;
  timerTags: TagData[];
  fetchedTags: TagData[];
};

export const TagNames: React.FC<TagNamesProps> = ({ timerTags, fetchedTags, timerId }) => {
  const [searchText, setSearchText] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [touched, setTouched] = React.useState(false);
  const [tags, setTags] = React.useState(timerTags);

  const [tagsToAssign, setTagsToAssign] = React.useState<TagData['id'][]>(
    timerTags.map((tag) => tag.id)
  );
  const open = Boolean(anchorEl);
  const tagNames = tags.map((tag) => `${tag.tagName}, `);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const filteredTags = fetchedTags.filter((tag) =>
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

    const updatedTags = fetchedTags.filter((tag) => updatedTagsToAssign.includes(tag.id));

    setTags(updatedTags);
  };

  const handleCloseMenu = async () => {
    setAnchorEl(null);
    if (touched) {
      const result = await updateTagsForTimer(tagsToAssign, timerId);
      console.log(result);
    }
    setTouched(false);
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
        <Menu id='tags-menu' anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <Box sx={{ padding: '0.3rem' }}>
            <OutlinedInput
              sx={{
                mb: 2,
              }}
              type='search'
              placeholder='Пошук за назвою'
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <Divider />
          </Box>
          {filteredTags.map((tag) => (
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
