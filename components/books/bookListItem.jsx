import { useRouter } from 'next/router';
import Image from 'next/image';

// 3rd Party Libraries
import { Avatar, List, Typography } from 'antd'
import { AuthorAvatar } from '../author/authorAvatar';
import { BookCategory } from './bookCategory';
import { BookSeriesInfo } from './bookSeriesInfo';

// ------------------------------------------------

function BookListItem({ libraryId, book, t }) 
{
  const router = useRouter();

  return (<List.Item 
    key={book.id} 
    actions={[
      (<BookCategory key={`${book.id}-action-categories`} justList book={book} />),
      (<BookSeriesInfo key={`${book.id}-action-series`} book={book} t={t}/>)
    ]}
    extra={<Image src={book.links.image} width="98" height="150" alt={book.title} />}
    onClick={() => router.push(`/libraries/${libraryId}/books/${book.id}`)}>
        <List.Item.Meta
            avatar={<Avatar.Group maxCount="2" size="large">
              { book.authors.map(author => (<AuthorAvatar key={author.id} libraryId={libraryId} author={author} t={t}/>))}
            </Avatar.Group>}
            title={book.title}
            description={<Typography.Paragraph ellipsis lines={2}>{book.description}</Typography.Paragraph>}
        />
        {/* <Typography.Paragraph ellipsis lines={2}>{book.description}</Typography.Paragraph> */}
    </List.Item>);
}

export default BookListItem;