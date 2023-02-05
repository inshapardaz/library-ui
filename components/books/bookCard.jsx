import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Avatar, Card, Space, Typography } from 'antd'
import { AuthorAvatar } from '../author/authorAvatar';
import helpers from '../../helpers';
import { BookCategory } from './bookCategory';
import { BookSeriesInfo } from './bookSeriesInfo';
import { IconText } from '../common/iconText';
import { FiLayers } from 'react-icons/fi';
import { AiOutlineCopy } from 'react-icons/ai';
// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function BookCard({ libraryId, book, t }) 
{

  const cover = (<Image src={book.links.image} placeholder={helpers.defaultBookImage} 
    onError={helpers.setDefaultBookImage} width="262" height="400" alt={book.title}  />);
  const avatar  = (<Avatar.Group maxCount="2" size="large">
      { book.authors.map(author => (<AuthorAvatar key={author.id} libraryId={libraryId} author={author} t={t}/>))}
  </Avatar.Group>);
  const title = (<Link href={`/libraries/${libraryId}/books/${book.id}`}>{book.title}</Link>);
  const description = book.description ? (<Paragraph type="secondary" ellipsis>{book.description}</Paragraph>)
                  :(<Text type="secondary">{t('book.noDescription')}</Text>);
  const chapterCount = (<Link href={`/libraries/${libraryId}/books/${book.id}`}>
      <IconText icon={FiLayers} text={t('book.chapterCount', { count: book.chapterCount })} key="book-chapter-count" />
      </Link>);
  const pageCount = (<IconText icon={AiOutlineCopy} text={t('book.pageCount', { count: book.pageCount })} key="book-page-count" />);

  return (<Card key={book.id} cover={cover} actions={[chapterCount, pageCount]}>
      <Card.Meta
          avatar={avatar}
          title={title}
          description={description}
      />
      </Card>);
}

export default BookCard;