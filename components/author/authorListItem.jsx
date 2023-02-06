import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { List, Space, Typography } from 'antd'
import { ImBooks } from 'react-icons/im';
import { FaPenFancy } from 'react-icons/fa';
import helpers from '@/helpers/index';
import { IconText } from '../common/iconText';

// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function AuthorListItem({ libraryId, author, t }) 
{
  const avatar = (<Image src={author.links.image} placeholder={helpers.defaultAuthorImage} 
    onError={helpers.setDefaultAuthorImage} width="110" height="140" alt={author.title}  />);
  const title = (<Link href={`/libraries/${libraryId}/authors/${author.id}`}>{author.name}</Link>);
  const description = author.description ? (<Paragraph ellipsis type="secondary">{author.description}</Paragraph>)
                  :(<Text type="secondary">{t('author.noDescription')}</Text>);
  const bookCount = (<Link href={`/libraries/${libraryId}/authors/${author.id}`}>
      <IconText icon={ImBooks} text={t('author.bookCount', { count: author.bookCount })} key="auhtor-book-count" />
      </Link>);
  const writingsCount = (<Link href={`/libraries/${libraryId}/writings?author=${author.id}`}>
      <IconText icon={FaPenFancy} text="0" key="author-writings-count" />
      </Link>);

  return (<List.Item key={author.id} actions={[ bookCount, writingsCount ]}>
        <List.Item.Meta title={title} avatar={avatar} description={description} />
    </List.Item>);
}

export default AuthorListItem;