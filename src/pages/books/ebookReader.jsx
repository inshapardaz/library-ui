import { ActionIcon, Button, Breadcrumbs, Container, Drawer, Group, rem, Skeleton, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDisclosure, useFullscreen, useLocalStorage } from '@mantine/hooks';

// Local imports
import { useGetBookQuery, useGetChapterQuery, useGetBookChaptersQuery } from '@/store/slices/books.api';
import TableOfContents from "@/components/reader/tableOfContents";
import MarkdownReader from "@/components/reader/ebook/markdownReader";
import Error from '@/components/error';
import { IconBook, IconChapters, IconFullScreen, IconFullScreenExit } from '@/components/icon';
import classes from './ebookReader.module.css'
import StyleModel from "../../components/reader/ebook/styleModel";

//------------------------------------------------------

const EBookReaderPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { ref, toggle, fullscreen } = useFullscreen();
    const [opened, { open, close }] = useDisclosure(false);
    const { libraryId, bookId } = useParams();
    const [searchParams] = useSearchParams();
    const selectedChapterNumber = searchParams.get("chapter") ?? 1;
    const [readerView] = useLocalStorage({
        key: "reader-view-type",
        defaultValue: 'scroll',
    });

    const {
        data: book,
        error: errorLoadingBook,
        isFetching: loadingBook,
        refetch: refetchBook
    } = useGetBookQuery({
        libraryId,
        bookId
    });

    const {
        data: chapter,
        error: errorLoadingChapter,
        isFetching: loadingChapter,
        refetch: refetchChapter
    } = useGetChapterQuery({
        libraryId,
        bookId,
        chapterNumber: selectedChapterNumber
    }, {
        skip: loadingBook || errorLoadingBook || !libraryId || book === null || book?.id === null || selectedChapterNumber == null
    });

    const {
        data: chapters,
        error: errorLoadingChapters,
        isFetching: loadingChapters,
        refetch: refetchChapters
    } = useGetBookChaptersQuery({
        libraryId,
        bookId: book?.id
    }, { skip: loadingBook || errorLoadingBook || !libraryId || book === null || book?.id === null });

    if (loadingBook || loadingChapters || loadingChapter) {
        return (<Container fluid mt="sm">
            <Stack>
                {
                    Array(20).fill(1).map((e, index) => <Skeleton key={index} height={rem(8)} radius="md" />)
                }
            </Stack>
        </Container>);
    }

    if (errorLoadingBook || errorLoadingChapters || errorLoadingChapter) {
        return (<Container fluid mt="sm">
            <Error title={t('book.error.loading.title')}
                detail={t('book.error.loading.detail')}
                onRetry={() => {
                    refetchBook();
                    refetchChapter();
                    refetchChapters();
                }} />
        </Container>)
    }

    const chapterLinks = chapters?.data.map(c => (
        { key: c.chapterNumber, label: c.title, order: 1, icon: (<IconChapters />) }
    ));

    const onChapterSelected = (item) => {
        navigate(`/libraries/${libraryId}/books/${book.id}/ebook?chapter=${item.key}`)
    }

    const items = [
        (<Button variant="transparent" color="gray" component={Link} to={`/libraries/${libraryId}/books/${book.id}`} leftSection={<IconBook />} key='book'>
            {book.title}
        </Button>),
        (<Button variant="transparent" color="gray" onClick={open} leftSection={<IconChapters />} key="chapter">
            {chapter ? chapter.title : t('book.chapters')}
        </Button>),
    ]

    const selectedLanguage = book?.language ?? "ur"

    return (<Container fluid ref={ref} className={classes.reader}>
        <Group justify="space-between">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Group>
                <StyleModel language={selectedLanguage} t={t} />
                <ActionIcon onClick={toggle} size={36} variant="default">
                    {fullscreen ? <IconFullScreenExit /> : <IconFullScreen />}
                </ActionIcon>
            </Group>
        </Group>
        <MarkdownReader libraryId={libraryId}
            bookId={bookId}
            viewType={readerView}
            chapterNumber={selectedChapterNumber}
            language={selectedLanguage}
            title={book?.title}
            subTitle={chapter?.title}
            canGoNext={chapter?.links?.next != null}
            canGoPrevious={chapter?.links?.previous != null}
            onNext={() => navigate(`/libraries/${libraryId}/books/${book.id}/ebook?chapter=${chapter.chapterNumber + 1}`)}
            onPrevious={() => navigate(`/libraries/${libraryId}/books/${book.id}/ebook?chapter=${chapter.chapterNumber - 1}`)} />
        <Drawer opened={opened} onClose={close} title={<Group><IconChapters />{t('book.chapters')}</Group>}>
            <TableOfContents title={book?.title} links={chapterLinks} selectedKey={selectedChapterNumber}
                onSelected={onChapterSelected} />
        </Drawer>
    </Container>)
}

export default EBookReaderPage;