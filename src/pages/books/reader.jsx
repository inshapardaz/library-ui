import { ActionIcon, Button, Container, Drawer, Group, rem, Skeleton, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDisclosure, useFullscreen, useLocalStorage } from '@mantine/hooks';

// Local imports
import { useGetBookQuery, useGetBookChaptersQuery } from '@/store/slices/books.api';
import { languages } from '@/i18n';
import TableOfContents from "@/components/reader/tableOfContents";
import MarkdownReader from "@/components/reader/markdownReader";
import ImageReader from "@/components/reader/imageReader";
import ReadModeToggle from "@/components/reader/readModeToggle";
import ReadViewToggle from "@/components/reader/ReadViewToggle";
import Error from '@/components/error';
import { IconChapters, IconFullScreen, IconFullScreenExit } from '@/components/icon';
//------------------------------------------------------

const BookReaderPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { ref, toggle, fullscreen } = useFullscreen();
    const [opened, { open, close }] = useDisclosure(false);
    const [readerMode, setReaderMode] = useLocalStorage({
        key: "reader-mode-type",
        defaultValue: 'image',
    });
    const [readerView, setReaderView] = useLocalStorage({
        key: "reader-view-type",
        defaultValue: 'scroll',
    });
    const { libraryId, bookId } = useParams();
    const [searchParams] = useSearchParams();
    const selectedChapterNumber = searchParams.get("chapter");
    const selectedPageNumber = searchParams.get("page") ?? 1;

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
        { key: c.chapterNumber, label: c.title, order: 1, icon: (<IconChapters />) }
    ));

    const onChapterSelected = (item) => {
        navigate(`/libraries/${libraryId}/books/${book.id}/read?chapter=${item.key}`)
    }

    const selectedLanguage = "ur"
    const hasPictures = book.pageCount > 0;
    const hasText = book.chapterCount > 0;

    return (<Container fluid ref={ref}>
        <Group justify="space-between">
            <Text>{book.title}</Text>
            <Group>
                {hasPictures && hasText ? <ReadModeToggle value={readerMode} onChange={setReaderMode} /> : null}
                {readerMode === "text" && <ReadViewToggle value={readerView} onChange={setReaderView} />}
                <Button variant="default" onClick={open} rightSection={<IconChapters />}>{t('book.chapters')}</Button>
                <ActionIcon onClick={toggle} size={36} variant="default">
                    {fullscreen ? <IconFullScreenExit /> : <IconFullScreen />}
                </ActionIcon>
            </Group>
        </Group>
        {readerMode === "text" ?
            (<MarkdownReader libraryId={libraryId} bookId={bookId} viewType={readerView} chapterNumber={selectedChapterNumber} language={selectedLanguage} />) :
            (<ImageReader libraryId={libraryId} bookId={bookId} pageNumber={Number(selectedPageNumber)} height={600} direction={languages[book?.language].dir} />)}
        <Drawer opened={opened} onClose={close} title={<Group><IconChapters />{t('book.chapters')}</Group>}>
            <TableOfContents title={book?.title} links={chapterLinks} selectedKey={selectedChapterNumber}
                onSelected={onChapterSelected} />
        </Drawer>
    </Container>)
}

export default BookReaderPage;