import { useTranslations } from 'next-intl';

// Local Imports
import LibrariesList from '@/components/libraries/list';
import PageHeader from '@/components/layout/pageHeader';

function LibrariesHomePage() {
  const t = useTranslations()

  return (<>
    <PageHeader title={t('libraries.header')} icon="building outline" />
    <LibrariesList />
  </>);
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`../../i18n/${locale}.json`)).default
  },
})

export default LibrariesHomePage;