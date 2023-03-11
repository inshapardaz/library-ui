
// 3rd party libraries
import { List } from 'antd';

// Internal Imports
import { useGetBookChaptersQuery } from '../../../features/api/booksSlice';
import Error from '../../common/error';
import Loading from '../../common/loader';
import ChapterListItem from './chapterListItem';

// ------------------------------------------------------

const ChaptersList = ({libraryId, bookId, t, selectedChapterNumber = null, size = 'default', hideTitle = false }) => {
    const { data : chapters, error, isFetching } = useGetBookChaptersQuery({libraryId, bookId}, { skip : !libraryId || !bookId })
    
    if (isFetching) return <Loading />
    if (error) return (<Error />)

    const title = hideTitle ? null : (<div>{t('book.chapters.title')}</div>)

    return (<List
            size={size}
            loading={isFetching}
            itemLayout="vertical"
            dataSource={chapters ? chapters.data : []}
            header={title}
            renderItem={(chapter) => (
                <ChapterListItem key={chapter.id} selected={selectedChapterNumber === chapter.chapterNumber} libraryId={libraryId} bookId={bookId} chapter={chapter} />
            )}
        />);
}

export default ChaptersList;