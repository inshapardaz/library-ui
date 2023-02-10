
// 3rd party libraries
import { List } from 'antd';

// Internal Imports
import ChapterListItem from './chapterListItem';


// ------------------------------------------------------

function ChaptersList({libraryId, bookId, chapters, t }) {
    
    return (<List
            size="large"
            itemLayout="vertical"
            dataSource={chapters ? chapters.data : []}
            header={<div>{t('book.chapters.title')}</div>}
            renderItem={(chapter) => (
                <ChapterListItem key={chapter.id} libraryId={libraryId} bookId={bookId} chapter={chapter} t={t} />
            )}
        />);
}

export default ChaptersList;