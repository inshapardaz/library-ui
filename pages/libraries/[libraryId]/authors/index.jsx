import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { FaFeatherAlt } from 'react-icons/fa';

// Local Imports
import PageHeader from '@/components/layout/pageHeader';
import AuthorsList from '@/components/author/authorsList';
import ContentsContainer from '@/components/layout/contentContainer';

function AuthorsHomePage() {
  const t = useTranslations()
  const router = useRouter();
  const { libraryId, query, authorType, pageNumber, pageSize } = router.query


  return (<>
    <Head>
      <title>{`${t('app')} - ${t('authors.title')}`}</title>
    </Head>
    <PageHeader title={t('authors.title')} icon={<FaFeatherAlt style={{ width: 36, height: 36 }}/>} />
    <ContentsContainer>
      <AuthorsList libraryId={libraryId} 
        query={query}
        authorType={authorType}
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

export default AuthorsHomePage;