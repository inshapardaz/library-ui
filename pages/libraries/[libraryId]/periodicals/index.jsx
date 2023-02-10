import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { ImNewspaper } from 'react-icons/im';

// Local Imports
import PageHeader from '@/components/layout/pageHeader';
import PeriodicalsList from '@/components/periodical/periodicalsList';
import ContentsContainer from '@/components/layout/contentContainer';

// ----------------------------------------------------

function PeriodicalsHomePage() {
    const t = useTranslations()
    const router = useRouter();
    const { libraryId, query, pageNumber, pageSize } = router.query
  
  
    return (<>
      <Head>
        <title>{`${t('app')} - ${t('periodicals.title')}`}</title>
      </Head>
      <PageHeader title={t('periodicals.title')} icon={<ImNewspaper style={{ width: 36, height: 36 }}/>} />
      <ContentsContainer>
        <PeriodicalsList libraryId={libraryId} 
          query={query}
          pageNumber={pageNumber}
          pageSize={pageSize}
          />
        </ContentsContainer>
    </>);
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`../../../../i18n/${locale}.json`)).default
  },
})


export default PeriodicalsHomePage;    