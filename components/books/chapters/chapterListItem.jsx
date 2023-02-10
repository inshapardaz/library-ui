import Link from 'next/link';

// 3rd Party Libraries
import { Avatar, List, Typography } from 'antd'
import { BiLayer } from 'react-icons/bi';

// Local Import

// ------------------------------------------------------

function ChapterListItem({ libraryId, bookId, chapter, t }) 
{
  const title = (<Link href={`/libraries/${libraryId}/books/${bookId}/chapters/${chapter.chapterNumber}`}>
      <Typography>{chapter.title}</Typography>
    </Link>);
  return (<List.Item>
      <List.Item.Meta 
        title={title} 
        avatar={<Avatar>{chapter.chapterNumber}</Avatar>} />
    </List.Item>);
}

export default ChapterListItem;