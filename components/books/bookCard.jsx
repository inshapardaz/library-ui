import { useRouter } from 'next/router';
import Image from 'next/image';

// 3rd Party Libraries
import { Card } from 'antd'

// --------------------------------------------------

function BookCard({ libraryId, book, style }) 
{
  const router = useRouter();

  return (<Card style={style} key={book.id} hoverable 
      cover={<Image src={book.links.image} width="262" height="400" alt={book.title} />}
      onClick={() => router.push(`/libraries/${libraryId}/books/${book.id}`)}>
      <Card.Meta
          title={book.title}
          description={book.description}
      />
      </Card>);
}

export default BookCard;