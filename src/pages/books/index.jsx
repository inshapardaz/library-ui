import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 3rd party libraries
import { FaBook } from 'react-icons/fa';

// Local Imports
import PageHeader from '../../components/layout/pageHeader';
import BooksList from '../../components/books/booksList';
import ContentsContainer from '../../components/layout/contentContainer';

function BooksHomePage() {
  const { t } = useTranslation()
  const { libraryId } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const author = searchParams.get('author')
  const categories = searchParams.get('categories')
  const series = searchParams.get('series')
  const favorite = searchParams.get('favorite')
  const read = searchParams.get('read')
  const status = searchParams.get('status')
  const sortBy = searchParams.get('sortBy') ?? 'DateCreated'
  const sortDirection = searchParams.get('sortDirection') ?? 'descending'
  const pageNumber = searchParams.get('pageNumber') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 12

  return (<>
    <PageHeader title={t('books.title')} icon={<FaBook style={{ width: 36, height: 36 }}/>} />
    <ContentsContainer>
      <BooksList libraryId={libraryId} 
        query={query}
        author={author}
        categories={categories}
        series={series}
        sortBy={sortBy}
        sortDirection={sortDirection}
        favorite={favorite}
        read={read}
        status={status}
        pageNumber={pageNumber}
        pageSize={pageSize}
        />
      </ContentsContainer>
  </>);
}
export default BooksHomePage;