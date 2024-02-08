import { TagsControl } from '@/features/tags';
import { TagsList } from '@/features/tags/components/TagsList/TagsList';
import { Typography } from '@mui/material';

const TagsPage = () => {
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Typography sx={{ mb: 3 }} variant='h5'>
        Теги
      </Typography>
      <TagsControl />
      <TagsList />
    </div>
  );
};

export default TagsPage;
