import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// 3rd Party Libraries
import { List, Space, Typography } from 'antd'
import { ImBooks } from 'react-icons/im';
import { FaPenFancy } from 'react-icons/fa';
import helpers from '../../helpers';

// ------------------------------------------------

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// ------------------------------------------------

function AuthorListItem({ libraryId, author, t }) 
{
  const router = useRouter();

  return (<List.Item 
    key={author.id} 
    onClick={() => router.push(`/libraries/${libraryId}/authors/${author.id}`)}
    actions={[
      <IconText icon={ImBooks} text={t('author.bookCount', { count: author.bookCount })} key="author-book-count" />,
      <IconText icon={FaPenFancy} text="0" key="author-writings-count" />
    ]}>
        <List.Item.Meta title={author.name} avatar={<Image src={author.links.image} placeholder={helpers.defaultAuthorImage} 
            onError={helpers.setDefaultAuthorImage} width="98" height="150" alt={author.title} />}
            description={<Typography.Paragraph ellipsis lines={2}>{t('author.bookCount', { count: author.bookCount })}</Typography.Paragraph>}
        />
    </List.Item>);
}

export default AuthorListItem;