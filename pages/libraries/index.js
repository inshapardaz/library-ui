import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Local Imports
import LibrariesList from '@/components/libraries/list';
import PageHeader from '@/components/layout/pageHeader';

function LibrariesHomePage() {
  const { t } = useTranslation()

  return (<>
    <PageHeader title={t('libraries.header')} icon="building outline" />
    <LibrariesList />
  </>);
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common', 'header'
    ])),
  },
})

export default LibrariesHomePage;