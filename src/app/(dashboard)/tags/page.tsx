import { TagsControl } from '@/features/tags';
import { TagsList } from '@/features/tags/components/TagsList/TagsList';
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
