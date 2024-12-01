import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

// UI library import
import { ActionIcon, Button, Container, Drawer, Group, rem, Skeleton, Stack, Text } from "@mantine/core";
import { useDisclosure, useFullscreen } from '@mantine/hooks';

// Local imports
import { useGetBookQuery, useGetBookChaptersQuery } from '@/store/slices/books.api';
import { languages } from '@/i18n';
import TableOfContents from "@/components/reader/tableOfContents";
import ImageReader from "@/components/reader/pages/imageReader";
import Error from '@/components/error';
import { IconChapters, IconFullScreen, IconFullScreenExit } from '@/components/icon';
import ReadModeToggle from "@/components/reader/readModeToggle";
import classes from './reader.module.css'
import { useMemo } from "react";
//------------------------------------------------------

const BookReaderPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { ref, toggle, fullscreen } = useFullscreen();
    const [opened, { open, close }] = useDisclosure(false);
    const { libraryId, bookId } = useParams();
    const [searchParams] = useSearchParams();
    const selectedPageNumber = searchParams.get("page") ?? "1";

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
        data: chapters,
        error: errorLoadingChapters,
        isFetching: loadingChapters,
        refetch: refetchChapters
    } = useGetBookChaptersQuery({
        libraryId,
        bookId: book?.id
    }, { skip: loadingBook || errorLoadingBook || !libraryId || book === null || book?.id === null });

    const hasGotChapterContents = useMemo(() => chapters && chapters.data && chapters.data.length > 0 && chapters.data.some(x => x.contents.length > 0), [chapters]);

    if (loadingBook || loadingChapters) {
        return (<Container fluid mt="sm">
            <Stack>
                {
                    Array(20).fill(1).map((e, index) => <Skeleton key={index} height={rem(8)} radius="md" />)
                }
            </Stack>
        </Container>);
    }


    if (errorLoadingBook || errorLoadingChapters) {
        return (<Container fluid mt="sm">
            <Error title={t('book.error.loading.title')}
                detail={t('book.error.loading.detail')}
                onRetry={() => {
                    refetchBook();
                    refetchChapters();
                }} />
        </Container>)
    }

    const chapterLinks = chapters?.data.map(c => (
        { key: c.chapterNumber, label: c.title, firstPageIndex: c.firstPageIndex, order: 1, icon: (<IconChapters />) }
    ));

    const onChapterSelected = (chapter) => {
        if (chapter.firstPageIndex) {
            navigate(`/libraries/${libraryId}/books/${book.id}/read?page=${chapter.firstPageIndex}`)
        }
    }

    const onReadModeChanged = (newMode) => {
        if (newMode === 'text') {
            navigate(`/libraries/${libraryId}/books/${book.id}/ebook`)
        }
    }

    return (<Container fluid ref={ref} className={classes.reader}>
        <div className={classes.imageReaderHeader}>
            <Group justify="space-between">
                <Text component={Link} to={`/libraries/${libraryId}/books/${book.id}`}>{book.title}</Text>
                <Group>
                    {hasGotChapterContents && <ReadModeToggle value='image' onChange={onReadModeChanged} />}
                    <Button variant="default" onClick={open} rightSection={<IconChapters />}>{t('book.chapters')}</Button>
                    <ActionIcon onClick={toggle} size={36} variant="default">
                        {fullscreen ? <IconFullScreenExit /> : <IconFullScreen />}
                    </ActionIcon>
                </Group>
            </Group>
        </div>
        <div className={classes.contents}>
            <ImageReader libraryId={libraryId} bookId={bookId} pageNumber={Number(selectedPageNumber)} height={600} direction={languages[book?.language].dir} />
        </div>

        <Drawer opened={opened} onClose={close} title={<Group><IconChapters />{t('book.chapters')}</Group>}>
            <TableOfContents title={book?.title} links={chapterLinks} onSelected={onChapterSelected} />
        </Drawer>
    </Container>)
}

export default BookReaderPage;