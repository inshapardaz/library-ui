import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Card, Typography } from 'antd';
import { ImBooks } from 'react-icons/im';
import { IconText } from '../common/iconText';
import { FaPenFancy } from 'react-icons/fa';

// Local Imports
import helpers from '@/helpers/index';

// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function AuthorCard({ libraryId, author, t }) 
{
  const cover = (<Image src={author.links.image} placeholder={helpers.defaultAuthorImage} 
    onError={helpers.setDefaultAuthorImage}  width="196" height="300" alt={author.title}  />);
  const title = (<Link href={`/libraries/${libraryId}/authors/${author.id}`}>{author.name}</Link>);
  const description = author.description ? (<Paragraph ellipsis type="secondary">{author.description}</Paragraph>)
                  :(<Text type="secondary">{t('author.noDescription')}</Text>);
  const bookCount = (<Link href={`/libraries/${libraryId}/authors/${author.id}`}>
      <IconText icon={ImBooks} text={t('author.bookCount', { count: author.bookCount })} key="auhtor-book-count" />
      </Link>);
  const writingsCount = (<Link href={`/libraries/${libraryId}/writings?author=${author.id}`}>
      <IconText icon={FaPenFancy} text="0" key="author-writings-count" />
      </Link>);

  return (<Card key={author.id} cover={cover} actions={[bookCount, writingsCount]}>
        <Card.Meta title={title} description={description}/>
      </Card>);
}

export default AuthorCard;