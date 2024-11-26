import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Center, Loader } from '@mantine/core';

// Local Import
import { useGetChapterContentsQuery } from '@/store/slices/books.api';
import Error from '@/components/error';
import ScrollReader from './scrollReader';
import FlipBookReader from './flipBookReader';
//---------------------------------

const MarkdownReader = ({ libraryId, bookId, chapterNumber, language, height, title, subTitle, canGoNext, onNext, canGoPrevious, onPrevious, viewType = "scroll" }) => {
    const { t } = useTranslation();

    const {
        data: chapterContent,
        error,
        isFetching,
        refetch
    } = useGetChapterContentsQuery({
        libraryId,
        bookId,
        chapterNumber,
        language
    }, { skip: !libraryId || !bookId || !chapterNumber || !language });

    if (isFetching) {
        return <Center h={height}><Loader /></Center>
    }

    if (error) {
        <Error title={t('book.error.loadingChapter.title')}
            detail={t('book.error.loadingChapter.detail')}
            onRetry={refetch} />
    }


    if (viewType === 'scroll') {
        return (<ScrollReader markdown={chapterContent?.text}
            title={title}
            subTitle={subTitle}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            onNext={onNext}
            onPrevious={onPrevious}
        />)
    } else if (viewType === 'singlePage' || viewType === 'doublePage') {
        return (<FlipBookReader markdown={chapterContent?.text}
            title={title}
            subTitle={subTitle}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            onNext={onNext}
            onPrevious={onPrevious}
        />)
    }

    return null;
}

MarkdownReader.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.string,
    chapterNumber: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    language: PropTypes.string,
    viewType: PropTypes.string,
    height: PropTypes.any,
    canGoNext: PropTypes.bool,
    onNext: PropTypes.func,
    canGoPrevious: PropTypes.bool,
    onPrevious: PropTypes.func
}

export default MarkdownReader;