import { Link } from 'react-router-dom';

// 3rd Party Libraries
import { Card, Typography } from 'antd';
import { ImBooks } from 'react-icons/im';
import { FaPenFancy } from 'react-icons/fa';

// Local Imports
import { IconText } from '../common/iconText';
import helpers from '../../helpers/index';

// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function AuthorCard({ libraryId, author, t }) 
{
  const cover = (<img src={author.links.image || helpers.defaultAuthorImage} 
    onError={helpers.setDefaultAuthorImage}  width="196" height="300" alt={author.name}  />);
  const title = (<Link to={`/libraries/${libraryId}/authors/${author.id}`}>{author.name}</Link>);
  const description = author.description ? (<Paragraph ellipsis type="secondary">{author.description}</Paragraph>)
                  :(<Text type="secondary">{t('author.noDescription')}</Text>);
  const bookCount = (<Link to={`/libraries/${libraryId}/authors/${author.id}`}>
      <IconText icon={ImBooks} text={t('author.bookCount', { count: author.bookCount })} key="auhtor-book-count" />
      </Link>);
  const writingsCount = (<Link to={`/libraries/${libraryId}/writings?author=${author.id}`}>
      <IconText icon={FaPenFancy} text={t('author.writingCount', { count: 0 })} key="author-writings-count" />
      </Link>);

  return (<Card key={author.id} cover={cover} actions={[bookCount, writingsCount]}>
        <Card.Meta title={title} description={description}/>
      </Card>);
}

export default AuthorCard;