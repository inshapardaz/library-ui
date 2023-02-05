import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Avatar, Card, Space, Typography } from 'antd'
import { AuthorAvatar } from '../author/authorAvatar';
import { BookCategory } from './bookCategory';
import { BookSeriesInfo } from './bookSeriesInfo';

function BookCard({ libraryId, book, t }) 
{

  return (<Link href={`/libraries/${libraryId}/books/${book.id}`}>
    <Card key={book.id} hoverable
      cover={<Image src={book.links.image} width="262" height="400" alt={book.title} />}>
      <Card.Meta
          avatar={<Avatar.Group maxCount="2" size="large">
            { book.authors.map(author => (<AuthorAvatar key={author.id} libraryId={libraryId} author={author} t={t}/>))}
          </Avatar.Group>}
          title={book.title}
          // description={<Space direction="vertical">
          //     <Typography.Paragraph ellipsis lines={2}>{book.description}</Typography.Paragraph>
          //     <BookCategory book={book} />
          //     <BookSeriesInfo book={book} t={t}/>
          //   </Space>}
      />
      </Card>
      </Link>);
}

export default BookCard;