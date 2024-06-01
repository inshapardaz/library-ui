import { Link } from 'react-router-dom';

// 3rd Party Libraries
import { Avatar, Card } from 'antd'
import { FiLayers } from 'react-icons/fi';
import { AiOutlineCopy } from 'react-icons/ai';

// Local Imports
import styles from '../../styles/common.module.scss'
import { AuthorAvatar } from '../author/authorAvatar';
import helpers from '../../helpers/index';
import { IconText } from '../common/iconText';

// ------------------------------------------------------

function BookCard({ libraryId, book, t }) 
{

  const cover = (book.links.image ? <img src={book.links.image} onError={helpers.setDefaultBookImage} className={ styles["book__image"]} alt={book.title}  /> : 
    <img src={helpers.defaultBookImage} className={ styles["book__image"]} alt={book.title} />);
  const avatar  = (<Avatar.Group maxCount="2" size="large">
      { book.authors.map(author => (<AuthorAvatar key={author.id} libraryId={libraryId} author={author} t={t}/>))}
  </Avatar.Group>);
  const chapterCount = (<Link to={`/libraries/${libraryId}/books/${book.id}`}>
      <IconText icon={FiLayers} text={t('book.chapterCount', { count: book.chapterCount })} key="book-chapter-count" />
      </Link>);
  const pageCount = (<IconText icon={AiOutlineCopy} text={t('book.pageCount', { count: book.pageCount })} key="book-page-count" />);
  return (<Link to={`/libraries/${libraryId}/books/${book.id}`}>
    <Card key={book.id} cover={cover} hoverable actions={[chapterCount, pageCount]}>
      <Card.Meta
          avatar={avatar}
          title={book.title} 
      />
      </Card>
    </Link>);
}

export default BookCard;