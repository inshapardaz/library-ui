import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Avatar, List, Typography } from 'antd'
import { FiLayers } from 'react-icons/fi';
import { AiOutlineCopy } from 'react-icons/ai';

// Local Import
import { AuthorAvatar } from '../author/authorAvatar';
import { BookCategory } from './bookCategory';
import { BookSeriesInfo } from './bookSeriesInfo';
import helpers from '../../helpers';
import { IconText } from '../common/iconText';
// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function BookListItem({ libraryId, book, t }) 
{
  const cover = (book.links.image ? <Image src={book.links.image} onError={helpers.setDefaultBookImage} width="98" height="150" alt={book.title}  /> : 
  <Image src={helpers.defaultBookImage}  width="98" height="150" alt={book.title} />);
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

  return (<List.Item 
    key={book.id} 
    actions={[chapterCount, pageCount,
      (<BookCategory key={`${book.id}-action-categories`} justList book={book} />),
      (<BookSeriesInfo key={`${book.id}-action-series`} book={book} t={t}/>)
    ]}
    extra={cover}>
        <List.Item.Meta avatar={avatar}
            title={title}
            description={description}
        />
    </List.Item>);
}

export default BookListItem;