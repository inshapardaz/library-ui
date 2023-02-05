import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Card, Typography } from 'antd'
import { IconText } from '../common/iconText';
import { ImBooks } from 'react-icons/im';

// Local imports
import helpers from '../../helpers';

// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function SeriesCard({ libraryId, series, t }) 
{
  const cover = (<Image src={series.links.image} placeholder={helpers.defaultSeriesImage} 
    onError={helpers.setDefaultSeriesImage}  width="262" height="400" alt={series.name} />);
  const title = (<Link href={`/libraries/${libraryId}/books?series=${series.id}`}>{series.name}</Link>);
  const description = series.description ? (<Paragraph type="secondary" ellipsis>{series.description}</Paragraph>)
                  :(<Text type="secondary">{t('series.noDescription')}</Text>);
  const bookCount = (<Link href={`/libraries/${libraryId}/books?series=${series.id}`}>
      <IconText icon={ImBooks} text={t('series.bookCount', { count: series.bookCount })} key="series-book-count" />
      </Link>);
  return (
    <Card key={series.id} hoverable cover={cover} actions={[bookCount]}>
      <Card.Meta title={title} description={description}/>
    </Card>);
}

export default SeriesCard;