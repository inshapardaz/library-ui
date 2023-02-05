import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Card } from 'antd'
import helpers from '../../helpers';

function AuthorCard({ libraryId, author, t }) 
{

  return (<Link href={`/libraries/${libraryId}/authors/${author.id}`}>
    <Card key={author.id} hoverable
      cover={<Image src={author.links.image} placeholder={helpers.defaultAuthorImage} 
              onError={helpers.setDefaultAuthorImage}
              width="196" height="300" alt={author.title} />}>
      <Card.Meta title={author.name}
          // description={<Space direction="vertical">
          //     <Typography.Paragraph ellipsis lines={2}>{book.description}</Typography.Paragraph>
          //     <BookCategory book={book} />
          //     <BookSeriesInfo book={book} t={t}/>
          //   </Space>}
      />
      </Card>
      </Link>);
}

export default AuthorCard;