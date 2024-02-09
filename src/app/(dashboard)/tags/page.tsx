import { TagsControl } from '@/features/tags';
import { TagsList } from '@/features/tags/components/TagsList/TagsList';
import { PageSearchParams } from '@/types';
import { Typography } from '@mui/material';

const TagsPage = ({ params, searchParams }: PageSearchParams) => {
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Typography sx={{ mb: 3 }} variant='h5'>
        Теги
      </Typography>
      <TagsControl />
      <TagsList params={params} searchParams={searchParams} />
    </div>
  );
};

export default TagsPage;
