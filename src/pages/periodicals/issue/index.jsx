import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// UI Library Import
import { Card, Center, Grid, Image, rem, Skeleton, Space, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import moment from "moment";

// Local Import
import { useGetPeriodicalByIdQuery } from '@/store/slices/periodicals.api';
import { useGetIssueQuery } from "@/store/slices/issues.api";
import { getDateFormatFromFrequency } from '@/utils';
import IssueArticlesList from "@/components/periodicals//issues/articles/issueArticlesList";
import IconText from '@/components/iconText';
import { IconIssue, IconVolumeNumber, IconIssueNumber, IconPages, IconIssueArticle } from '@/components/icon';
import Error from '@/components/error';

// -----------------------------------------
const PRIMARY_COL_HEIGHT = rem(300);
// -----------------------------------------
const IssuePage = () => {
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { libraryId, periodicalId, volumeNumber, issueNumber } = useParams();

    const {
        data: periodical
    } = useGetPeriodicalByIdQuery({
        libraryId,
        periodicalId
    });

    const {
        refetch,
        data: issue,
        isError,
        isFetching,
    } = useGetIssueQuery({
        libraryId,
        periodicalId,
        volumeNumber,
        issueNumber,
    });

    const icon = <Center h={450}><IconIssue width={250} style={{ color: theme.colors.dark[1] }} /></Center>;
    if (isFetching) {
        return (<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" />);
    }
    if (isError) {
        return (<Error title={t('book.error.loading.title')}
            detail={t('book.error.loading.detail')}
            onRetry={refetch} />)
    }
    if (!issue) {
        return (<Center h={100}><Text>Not Found</Text></Center>);
    }

    const title = moment(issue.issueDate).format(getDateFormatFromFrequency(periodical?.frequency));


    return (<Grid type="container" breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}>
        <Grid.Col span={{ md: 12, lg: 3, xl: 2 }} style={{ minWidth: rem(200) }}>
            <Card withBorder m="sm">
                {issue.links?.image ?
                    <Image
                        src={issue?.links?.image}
                        h={rem(400)}
                        w="auto"
                        radius="md"
                        alt={issue?.title}
                        fit='contain'
                    /> :
                    icon
                }
                <Space h="md" />

                <Stack>
                    <IconText icon={<IconVolumeNumber style={{ color: theme.colors.dark[2] }} />}
                        text={t('issue.volumeNumber.title', { volumeNumber: issue.volumeNumber })}
                        link={`/libraries/${libraryId}/periodicals/${issue.periodicalId}/volumes/${issue.volumeNumber}`} />
                    <IconText icon={<IconIssueNumber style={{ color: theme.colors.dark[2] }} />}
                        text={t('issue.issueNumber.title', { issueNumber: issue.issueNumber })} />
                    <IconText icon={<IconPages style={{ color: theme.colors.dark[2] }} />}
                        text={t('issue.pageCount', { count: issue.pageCount })} />
                    <IconText icon={<IconIssueArticle style={{ color: theme.colors.dark[2] }} />}
                        text={t('issue.articleCount', { count: issue.articleCount })} />
                </Stack>
            </Card>
        </Grid.Col>
        <Grid.Col span="auto">
            <Card withBorder m="sm">
                <Title truncate="end" order={2}>{periodical?.title} - {title}</Title>
                <IssueArticlesList
                    libraryId={libraryId}
                    periodicalId={periodicalId}
                    volumeNumber={volumeNumber}
                    issueNumber={issueNumber}
                    showSearch
                    showTitle={false} />
            </Card>
        </Grid.Col>
    </Grid>)
}

export default IssuePage;