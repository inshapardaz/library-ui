import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Local Imports
import LibrariesList from '@/components/libraries/list';
import PageHeader from '@/components/layout/pageHeader';

function LibrariesHomePage() {
  const { t } = useTranslation('common')

  return (<>
    <PageHeader title={t('libraries.header')} icon="building outline" />
    <LibrariesList />
  </>);
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})

export default LibrariesHomePage;