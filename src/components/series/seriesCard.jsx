import { Link } from 'react-router-dom';

// 3rd Party Libraries
import { Card, Typography } from 'antd';
import { ImBooks } from 'react-icons/im';

// Local Imports
import styles from '../../styles/common.module.scss'
import { IconText } from '../common/iconText';
import helpers from '../../helpers/index';

// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

function SeriesCard({ libraryId, series, t }) 
{
  const cover = (<img src={series.links.image || helpers.defaultSeriesImage} 
    onError={helpers.setDefaultSeriesImage}  className={ styles["series__image"]} alt={series.name}  />);
  const title = (<Link to={`/libraries/${libraryId}/series/${series.id}`}>{series.name}</Link>);
  const description = series.description ? (<Paragraph ellipsis type="secondary">{series.description}</Paragraph>)
                  :(<Text type="secondary">{t('series.noDescription')}</Text>);
  const bookCount = (<Link to={`/libraries/${libraryId}/series/${series.id}`}>
      <IconText icon={ImBooks} text={t('series.bookCount', { count: series.bookCount })} key="auhtor-book-count" />
      </Link>);

  return (<Card key={series.id} cover={cover} actions={[bookCount]}>
        <Card.Meta title={title} description={description}/>
      </Card>);
}

export default SeriesCard;