import { Link } from 'react-router-dom';

// 3rd Party Libraries
import { Avatar, Card, Typography } from 'antd'
import { FiLayers } from 'react-icons/fi';
import { AiOutlineCopy } from 'react-icons/ai';

// Local Imports
import { AuthorAvatar } from '../author/authorAvatar';
import helpers from '../../helpers/index';
import { BookSeriesInfo } from './bookSeriesInfo';
import { IconText } from '../common/iconText';
// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function BookCard({ libraryId, book, t }) 
{

  const cover = (book.links.image ? <img src={book.links.image} onError={helpers.setDefaultBookImage} width="262" height="400" alt={book.title}  /> : 
            <img src={helpers.defaultBookImage}  width="262" height="400" alt={book.title} />);
  const avatar  = (<Avatar.Group maxCount="2" size="large">
      { book.authors.map(author => (<AuthorAvatar key={author.id} libraryId={libraryId} author={author} t={t}/>))}
  </Avatar.Group>);
  const title = (<Link to={`/libraries/${libraryId}/books/${book.id}`}>{book.title}</Link>);
  const description = book.description ? (<Paragraph ellipsis>{book.description}</Paragraph>)
                  :(<Text type="secondary">{t('book.noDescription')}</Text>);
  const chapterCount = (<Link to={`/libraries/${libraryId}/books/${book.id}`}>
      <IconText icon={FiLayers} text={t('book.chapterCount', { count: book.chapterCount })} key="book-chapter-count" />
      </Link>);
  const pageCount = (<IconText icon={AiOutlineCopy} text={t('book.pageCount', { count: book.pageCount })} key="book-page-count" />);
//   const details = (<Space>
//     <BookSeriesInfo book={book} t={t} />
//   </Space>) 
  return (<Card key={book.id} cover={cover} actions={[chapterCount, pageCount]}>
      <Card.Meta
          avatar={avatar}
          title={title}
          description={<BookSeriesInfo book={book} t={t} />}
      />
        {description}
      </Card>);
}

export default BookCard;