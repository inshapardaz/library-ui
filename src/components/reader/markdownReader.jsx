import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import Markdown from 'react-markdown'
import { Center, Loader, ScrollArea } from '@mantine/core';

// Local Import
import { useGetChapterContentsQuery } from '@/store/slices/books.api';
import Error from '@/components/error';
//---------------------------------

const MarkdownReader = ({ libraryId, bookId, chapterNumber, language, height, viewType = "scroll" }) => {
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
        return (
            <ScrollArea scrollbars="y" h={height}>
                <Markdown>{chapterContent?.text}</Markdown>
            </ScrollArea>)
    } else if (viewType === 'singlePage') {
        return null;
    } else if (viewType === 'doublePage') {
        return null;
    } else {
        return null;
    }
}

MarkdownReader.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.string,
    chapterNumber: PropTypes.string,
    language: PropTypes.string,
    viewType: PropTypes.string,
    height: PropTypes.any
}

export default MarkdownReader;