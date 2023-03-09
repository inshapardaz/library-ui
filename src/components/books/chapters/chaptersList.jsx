
// 3rd party libraries
import { List } from 'antd';

// Internal Imports
import { useGetBookChaptersQuery } from '../../../features/api/booksSlice';
import Error from '../../common/error';
import Loading from '../../common/loader';
import ChapterListItem from './chapterListItem';

// ------------------------------------------------------

const ChaptersList = ({libraryId, bookId, t }) => {
    const { data : chapters, error, isFetching } = useGetBookChaptersQuery({libraryId, bookId}, { skip : !libraryId || !bookId })
    
    if (isFetching) return <Loading />
    if (error) return (<Error />)

    return (<List
            size="large"
            loading={isFetching}
            itemLayout="vertical"
            dataSource={chapters ? chapters.data : []}
            header={<div>{t('book.chapters.title')}</div>}
            renderItem={(chapter) => (
                <ChapterListItem key={chapter.id} libraryId={libraryId} bookId={bookId} chapter={chapter} t={t} />
            )}
        />);
}

export default ChaptersList;