'use client';
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
  tags: TagData[];
  fetchedTags: TagData[];
};

export const TagNames: React.FC<TagNamesProps> = ({ tags, fetchedTags }) => {
  const [searchText, setSearchText] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [tagsToAssign, setTagsToAssign] = React.useState<TagData['id'][]>(
    tags.map((tag) => tag.id)
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
    if (e.target.checked) {
      setTagsToAssign([...tagsToAssign, e.target.value]);
    } else {
      const filtered = tagsToAssign.filter((tag) => tag !== e.target.value);
      setTagsToAssign(filtered);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
            <Chip
              sx={{ backgroundColor: 'background.paper', borderRadius: 0 }}
              label={<>{...tagNames}</>}
            />
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
                control={
                  <Checkbox
                    defaultChecked={tags.some((t) => t.id === tag.id)}
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
