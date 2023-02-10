import Head from 'next/head';
import { useTranslations } from 'next-intl';

// 3rd party library
import { Col, Row } from "antd";
import { ImBooks } from "react-icons/im";

// Local imports
import libraryService from '@/services/libraryService';
import ContentsContainer from "@/components/layout/contentContainer";
import PageHeader from "@/components/layout/pageHeader";
import ChaptersList from "@/components/books/chapters/chaptersList";
import BookInfo from "@/components/books/bookInfo";

//------------------------------------------------------

function BookPage({ libraryId, bookId, book, chapters }) {
    const t = useTranslations();

    if (book === null) return null;

    return (<>
        <Head>
            <title>{`${t('app')} - ${book.title}`}</title>
        </Head>
        <PageHeader title={ book.title } icon={<ImBooks style={{ width: 36, height: 36 }}/>} /> 
        <ContentsContainer>
            <Row gutter={16}>
                <Col span={4}>
                    <BookInfo libraryId={libraryId} book={book} t={t} />
                </Col>
                <Col span={20}>
                    <ChaptersList libraryId={libraryId} bookId={bookId} chapters={chapters} t={t}/>
                </Col>
            </Row>
        </ContentsContainer>
    </>);
}

export const getServerSideProps = async ({
    locale, params
  }) => ({
    props: {
      messages: (await import(`../../../../../i18n/${locale}.json`)).default,
      libraryId: params.libraryId,
      bookId: params.bookId, 
      book: (await libraryService.getBook(params.libraryId, params.bookId)),
      chapters: (await libraryService.getBookChapters(params.libraryId, params.bookId))
    },
  })

export default BookPage;