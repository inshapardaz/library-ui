import React from 'react';
import Image from 'next/image';

// 3rd Party Libraries
import { List, Typography } from 'antd'
import { BiNews } from 'react-icons/bi';
import helpers from '../../helpers';
import Link from 'next/link';
import { IconText } from '../common/iconText';

// ------------------------------------------------

function PeriodicalListItem({ libraryId, periodical, t }) 
{
  const avatar = (<Image src={periodical.links.image} placeholder={helpers.defaultPeriodicalImage} 
    onError={helpers.setDefaultPeriodicalImage} width="98" height="150" alt={periodical.title} />);

  const title = (<Link href={`/libraries/${libraryId}/periodicals/${periodical.id}`}>{periodical.title}</Link>);
  const description = (<Typography.Paragraph ellipsis lines={2}>{periodical.description}</Typography.Paragraph>);
  const issueCount = (<IconText icon={BiNews} text={t('periodical.issueCount', { count: periodical.issueCount })} key="periodical-issue-count" />);

  return (<List.Item key={periodical.id} actions={[ issueCount ]}>
        <List.Item.Meta title={title} 
            avatar={avatar}
            description={description}
        />
    </List.Item>);
}

export default PeriodicalListItem;