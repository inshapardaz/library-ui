import Link from 'next/link';
import Image from 'next/image';

// 3rd Party Libraries
import { Card, Typography } from 'antd'
import { IconText } from '../common/iconText';
import { BiNews } from 'react-icons/bi';

// Local imports
import helpers from '../../helpers';

// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function PeriodicalCard({ libraryId, periodical, t }) 
{
  const cover = (<Image src={periodical.links.image} placeholder={helpers.defaultPeriodicalImage} 
    onError={helpers.setDefaultPeriodicalImage}  width="262" height="400" alt={periodical.title} />);
  const title = (<Link href={`/libraries/${libraryId}/periodicals/${periodical.id}`}>{periodical.title}</Link>);
  const description = periodical.description ? (<Paragraph type="secondary" ellipsis>{periodical.description}</Paragraph>)
                  :(<Text type="secondary">{t('periodical.noDescription')}</Text>);
  const issueCount = (<Link href={`/libraries/${libraryId}/periodicals/${periodical.id}/issues`}>
      <IconText icon={BiNews} text={t('periodical.issueCount', { count: periodical.issueCount })} key="periodical-issues-count" />
      </Link>);
  return (
    <Card key={periodical.id} cover={cover} actions={[issueCount]}>
      <Card.Meta title={title} description={description}/>
    </Card>);
}

export default PeriodicalCard;