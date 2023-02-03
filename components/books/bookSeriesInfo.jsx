import { Typography } from 'antd';

export function BookSeriesInfo({ book, t }) {
  if (book && book.seriesName) {

    if (book.seriesIndex && book.seriesIndex > 0) {
      return (<Typography>{t('book.seriesAndIndex', { name: book.seriesName, index: book.seriesIndex })}</Typography>);
    }

    else {
      return (<Typography>{t('book.series', { name: book.seriesName })}</Typography>);
    }
  }

  return null;
}
