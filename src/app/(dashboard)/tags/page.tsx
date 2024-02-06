import { TagsControl, TagsList } from '@/features/tags';
import { Box, Typography } from '@mui/material';

const TagsPage = () => {
  return (
    <Box sx={{ padding: '2.85rem .7rem' }}>
      <Typography sx={{ mb: 3 }} variant='h5'>
        Теги
      </Typography>
      <TagsControl />
      <TagsList />
    </Box>
  );
};

export default TagsPage;
