import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";

// 3rd party libraries
import { ImBooks } from 'react-icons/im';
import { Layout, theme } from 'antd';

// Local Imports
import libraryService from "@/services/libraryService";
import PageHeader from '@/components/layout/pageHeader';
import BooksList from '@/components/books/booksList';
import ContentsContainer from '@/components/layout/contentContainer';
import BooksSideBar from '@/components/books/booksSideBar';
import { useEffect } from 'react';

 //--------------------------------------------------------
 const {  Content, Sider } = Layout;
 //--------------------------------------------------------
function BooksPage({ libraryId, books }) {
  const t = useTranslations();
  const router = useRouter();
  const { token: { colorBgContainer } } = theme.useToken();

  const { query, categories, series, author, sortBy, sortDirection, favorites, read, status, pageNumber, pageSize } = router.query

  return (<>
    <Head>
        <title>{`${t('app')} - ${t('books.title')}`}</title>
    </Head>
    <PageHeader title={t('books.title')} icon={<ImBooks style={{ width: 36, height: 36 }}/>} />
    <ContentsContainer>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <BooksSideBar />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <BooksList libraryId={libraryId} books={books}
              query={query}
              categories={categories} 
              author={author}
              series={series}
              sortBy={sortBy}
              sortDirection={sortDirection}
              favorites={favorites}
              read={read}
              status={status}
              pageNumber={pageNumber}
              pageSize={pageSize}
              />
          </Content>
        </Layout>
      </ContentsContainer>
  </>);
}

export const getServerSideProps = async ({
  locale, params
}) => ({
  props: {
    messages: (await import(`../../../../i18n/${locale}.json`)).default,
    libraryId: params.libraryId,
    books: (await libraryService.getBooks(params.libraryId, params.query, params.author, params.categories, params.series, params.sortBy, params.sortDirection, params.favorites, params.read, params.status, params.pageNumber, params.pageSize)),
  },
})

export default BooksPage;