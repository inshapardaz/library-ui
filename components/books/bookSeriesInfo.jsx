import { Typography } from 'antd';
// ------------------------------------------------------

const {Text, Paragraph} = Typography;

// ------------------------------------------------------

export function BookSeriesInfo({ book, t }) {
  if (book && book.seriesName) {

    if (book.seriesIndex && book.seriesIndex > 0) {
      return (<Text type='secondary'>{t('book.seriesAndIndex', { name: book.seriesName, index: book.seriesIndex })}</Text>);
    }

    else {
      return (<Text>{t.raw('book.series', { name: book.seriesName })}</Text>);
    }
  }

  return null;
}
