import { useRouter } from 'next/router';
import Image from 'next/image';

// 3rd Party Libraries
import { Avatar, Card, Tooltip, Typography } from 'antd'

// --------------------------------------------------

function BookCard({ libraryId, book }) 
{
  const router = useRouter();

  return (<Card key={book.id} hoverable 
      cover={<Image src={book.links.image} width="262" height="400" alt={book.title} />}
      onClick={() => router.push(`/libraries/${libraryId}/books/${book.id}`)}>
      <Card.Meta
          avatar={<Avatar.Group maxCount="2" size="large">
            { book.authors.map(author => (
            <Tooltip key={author.id} title={author.name}>
                <Avatar src={author.links.image} />
            </Tooltip> ))}
          </Avatar.Group>}
          title={book.title}
          description={<Typography.Paragraph ellipsis lines={2}>{book.description}</Typography.Paragraph>}
      />
      </Card>);
}

export default BookCard;