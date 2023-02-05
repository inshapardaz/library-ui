import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { ImBooks } from 'react-icons/im';

// Local Imports
import PageHeader from '@/components/layout/pageHeader';
import BooksList from '@/components/books/booksList';

function BooksPage() {
  const t = useTranslations()
  const router = useRouter();
  const { libraryId, query, categories, series, sortBy, sortDirection, favorites, read, status, pageNumber, pageSize } = router.query


  return (<>
    <PageHeader title={t('books.title')} icon={<ImBooks style={{ width: 36, height: 36 }}/>} />
    <BooksList libraryId={libraryId} 
      query={query}
      categories={categories} 
      series={series}
      sortBy={sortBy}
      sortDirection={sortDirection}
      favorites={favorites}
      read={read}
      status={status}
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

export default BooksPage;