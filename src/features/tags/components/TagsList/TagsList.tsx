import { Tag } from '@/features/tags';
import { fetchTags } from '@/services';
import { PageSearchParams } from '@/types';
import { Box, List, ListSubheader, Paper } from '@mui/material';
import React from 'react';

type TagsListProps = {
  params: PageSearchParams['params'];
  searchParams: PageSearchParams['searchParams'];
};

export const TagsList: React.FC<TagsListProps> = async ({ params, searchParams }) => {
  const data = await fetchTags(searchParams);

  if (data?.error) return <h1>{data.error}</h1>;
  if (data?.success) {
    return (
      <Paper sx={{ my: '1.5rem' }}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component='nav'
          subheader={
            <ListSubheader component='div' id='nested-tag_list-subheader'>
              Назва
            </ListSubheader>
          }
        >
          <Box sx={{ backgroundColor: 'customBG.list' }}>
            {data.success.map((tag) => (
              <Tag key={tag.id} id={tag.id} tagName={tag.tagName} archived={tag.archived} />
            ))}
          </Box>
        </List>
      </Paper>
    );
  }
};
