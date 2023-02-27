import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 3rd party libraries
import { FaFeatherAlt } from 'react-icons/fa';

// Local Imports
import PageHeader from '../../components/layout/pageHeader';
import AuthorsList from '../../components/author/authorsList';
import ContentsContainer from '../../components/layout/contentContainer';

function AuthorsHomePage() {
  const { t } = useTranslation()
  const { libraryId } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const authorType = searchParams.get('authorType')
  const pageNumber = searchParams.get('pageNumber')
  const pageSize = searchParams.get('pageSize')

  console.dir({ query, authorType, pageNumber, pageSize })
  return (<>
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
export default AuthorsHomePage;