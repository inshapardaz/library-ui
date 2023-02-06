import { useTranslations } from 'next-intl';

// 3rd party libraries
import { ImLibrary } from 'react-icons/im';

// Local Imports
import LibrariesList from '@/components/libraries/list';
import PageHeader from '@/components/layout/pageHeader';
import ContentsContainer from '@/components/layout/contentContainer';

function LibrariesHomePage() {
  const t = useTranslations()

  return (<>
    <PageHeader title={t('libraries.title')} icon={<ImLibrary />} />
    <ContentsContainer>
      <LibrariesList />
    </ContentsContainer>
  </>);
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`@/i18n/${locale}.json`)).default
  },
})

export default LibrariesHomePage;