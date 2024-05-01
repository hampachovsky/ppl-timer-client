import { ListControl } from '@/features/list';
import { TagsList } from '@/features/tags/components/TagsList/TagsList';
import { createTag } from '@/services';
import { PageSearchParams } from '@/types';
import { Typography } from '@mui/material';

const TagsPage = ({ params, searchParams }: PageSearchParams) => {
  return (
    <div style={{ padding: '2.85rem .7rem' }}>
      <Typography sx={{ mb: 3 }} variant='h5'>
        Теги
      </Typography>
      <ListControl createItem={createTag} />
      <TagsList params={params} searchParams={searchParams} />
    </div>
  );
};

export default TagsPage;
