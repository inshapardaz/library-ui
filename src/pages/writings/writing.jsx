import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Ui Library Import
import { ActionIcon, Container, Grid, Group, rem, Skeleton } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

// Local imports
import { useGetArticleQuery, useGetArticleContentsQuery } from "@/store/slices/articles.api";
import Error from '@/components/error';
import MarkdownReader from "@/components/reader/ebook/markdownReader";
import { IconFullScreen, IconFullScreenExit } from '@/components/icon';

//----------------------------------
const getLanguage = (article, language) => {
    if (article && article.contents && article.contents[0]) {
        if (language) {
            return article.contents.find(d => d.language === language);
        }
        return article.contents[0].language;
    }

    return false;
}

const PRIMARY_COL_HEIGHT = rem(300);
const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

//----------------------------------
const WritingPage = () => {
    const { t } = useTranslation();
    const { libraryId, articleId } = useParams();
    const [searchParams] = useSearchParams();
    const language = searchParams.get("language");
    const { ref, toggle, fullscreen } = useFullscreen();

    const {
        refetch,
        data: article,
        isError: isErrorLoadingArticle,
        isFetching: isLoadingArticle,
    } = useGetArticleQuery({
        libraryId, articleId
    });

    const {
        refetch: refetchContent,
        data: articleContent,
        isError: isErrorLoadingContent,
        isFetching: isLoadingContent,
    } = useGetArticleContentsQuery({
        libraryId,
        articleId,
        language: getLanguage(article, language)
    }, {
        skip: isLoadingArticle || isErrorLoadingArticle || !libraryId || articleId === null || getLanguage(article, language) == null
    });

    if (isLoadingArticle || isLoadingContent) {
        return (<Container fluid mt="sm">
            <Grid
                mih={50}
            >
                <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                    <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" />
                </Grid.Col>
            </Grid>
        </Container>);
    }

    if (isErrorLoadingArticle || isErrorLoadingContent) {
        return (<Container fluid mt="sm">
            <Error title={t('book.error.loading.title')}
                detail={t('book.error.loading.detail')}
                onRetry={() => { refetch() && refetchContent() }} />
        </Container>)
    }

    return (<Container fluid ref={ref}>
        <Group justify="space-between">
            <Group>
                <ActionIcon onClick={toggle} size={36} variant="default">
                    {fullscreen ? <IconFullScreenExit /> : <IconFullScreen />}
                </ActionIcon>
            </Group>
        </Group>
        <MarkdownReader
            markdown={articleContent?.text}
            layout={articleContent?.layout}
            viewType='scroll'
            title={article?.title}
            showNavigation={false} />
    </Container>)

}

export default WritingPage;