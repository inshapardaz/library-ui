import React from 'react';
import Image from 'next/image';

// 3rd Party Libraries
import { List, Typography } from 'antd'
import { ImBooks } from 'react-icons/im';
import helpers from '../../helpers';
import Link from 'next/link';
import { IconText } from '../common/iconText';

// ------------------------------------------------

function SeriesListItem({ libraryId, series, t }) 
{
  const avatar = (<Image src={series.links.image} placeholder={helpers.defaultSeriesImage} 
    onError={helpers.setDefaultSeriesImage} width="98" height="150" alt={series.name} />);

  const title = (<Link href={`/libraries/${libraryId}/books?series=${series.id}`}>{series.name}</Link>);
  const description = (<Typography.Paragraph ellipsis lines={2}>{series.description}</Typography.Paragraph>);
  const bookCount = (<IconText icon={ImBooks} text={t('series.bookCount', { count: series.bookCount })} key="series-book-count" />);

  return (<List.Item key={series.id} actions={[ bookCount ]}>
        <List.Item.Meta title={title} 
            avatar={avatar}
            description={description}
        />
    </List.Item>);
}

export default SeriesListItem;