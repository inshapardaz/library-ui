import { Avatar, Popover, Space, Typography } from 'antd';
import { FaFeatherAlt } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import Link from 'next/link';

// Local imports
import helpers from '../../helpers';

// --------------------------------------------------
export function AuthorAvatar({ author, libraryId, t }) {
  const avatar = (author.links.image ? <Avatar src={author.links.image} onError={helpers.setDefaultAuthorImage}></Avatar> :
    <Avatar src={helpers.defaultAuthorImage}></Avatar>);
  const popoverTitle = (<Space>
    { avatar }
    <Link href={`/libraries/${libraryId}/authors/${author.id}`}>
      <Typography>{author.name}</Typography>
    </Link>
  </Space>);

  const popoverContent = (<div>
    <p><ImBooks /> <Link href={`/libraries/${libraryId}/books?author=${author.id}`}>{t('author.bookCount', { count: author.bookCount })}</Link></p>
    <p><FaFeatherAlt /> {author.type == 'writer' ? t('author.writer') : t('author.poet')}</p>
  </div>);
  return (
    <Popover key={author.id} content={popoverContent} title={popoverTitle}>
          { avatar }
    </Popover>);
}
