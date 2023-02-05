import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { ImBooks } from 'react-icons/im';

// Local Imports
import PageHeader from '@/components/layout/pageHeader';
import SeriesList from '@/components/series/seriesList';

function SeriesHomePage() {
  const t = useTranslations()
  const router = useRouter();
  const { libraryId, query, pageNumber, pageSize } = router.query


  return (<>
    <PageHeader title={t('series.title')} icon={<ImBooks style={{ width: 36, height: 36 }}/>} />
    <SeriesList libraryId={libraryId} 
      query={query}
      pageNumber={pageNumber}
      pageSize={pageSize}
      />
  </>);
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`../../../../i18n/${locale}.json`)).default
  },
})

export default SeriesHomePage;