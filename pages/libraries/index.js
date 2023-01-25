import { useTranslation } from 'react-i18next'

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

export default LibrariesHomePage;