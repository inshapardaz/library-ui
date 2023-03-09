import { Link } from 'react-router-dom';

// 3rd Party Libraries
import { List, Typography } from 'antd'
import { FiLayers } from 'react-icons/fi';
import { SlCalender } from 'react-icons/sl';

// Local Import
import styles from '../../styles/common.module.scss'
import { PeriodicalCategory } from './periodicalCategory';
import helpers from '../../helpers/index';
import { IconText } from '../common/iconText';
// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function PeriodicalListItem({ libraryId, periodical, t }) 
{
  const cover = (periodical.links.image ? <img src={periodical.links.image} onError={helpers.setDefaultPeriodicalImage} className={ styles["periodical__image--small"]} alt={periodical.title}  /> : 
  <img src={helpers.defaultPeriodicalImage}  className={ styles["periodical__image--small"]} alt={periodical.title} />);
  
  const title = (<Link to={`/libraries/${libraryId}/periodicals/${periodical.id}`}>{periodical.title}</Link>);
  const description = periodical.description ? (<Paragraph type="secondary" ellipsis>{periodical.description}</Paragraph>)
    :(<Text type="secondary">{t('periodical.noDescription')}</Text>);
  const issueCount = (<Link to={`/libraries/${libraryId}/periodicals/${periodical.id}`}>
    <IconText icon={FiLayers} text={t('periodical.issueCount', { count: periodical.issueCount })} key="book-chapter-count" />
    </Link>);
  const frequency = (<IconText icon={SlCalender} text={t(`periodical.frequency.${periodical.frequency.toLowerCase()}`, { count: periodical.frequency })} key="book-page-count" />);

  return (<List.Item 
    key={periodical.id} 
    actions={[issueCount, frequency,
      (<PeriodicalCategory key={`${periodical.id}-action-categories`} justList periodical={periodical} />),
    ]}
    extra={cover}>
        <List.Item.Meta
            title={title}
            description={description}
        />
    </List.Item>);
}

export default PeriodicalListItem;