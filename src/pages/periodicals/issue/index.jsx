import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

// UI Library Import
import { Badge, Button, Card, Center, Group, rem, Skeleton, Text } from "@mantine/core";
import moment from "moment";

// Local Import
import { useGetPeriodicalByIdQuery } from '@/store/slices/periodicals.api';
import { useGetIssueQuery } from "@/store/slices/issues.api";
import { Icon, IconNames, IconReaderText } from '@/components/icon';
import { getDateFormatFromFrequency } from '@/utils';
import IssueArticlesList from "@/components/periodicals//issues/articles/issueArticlesList";
import DetailTemplate from "@/components/detail/detailTemplate";
import ShareButton from "@/components/detail/shareButton";
import Error from '@/components/error';

// -----------------------------------------
const PRIMARY_COL_HEIGHT = rem(300);
// -----------------------------------------
const IssuePage = () => {
    const { t } = useTranslation();
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


    return (<DetailTemplate
        title={periodical?.title ?? ''}
        subTitle={t('issue.issueNumber.title', { issueNumber: issue.issueNumber }) + ' · ' + title}
        image={issue.links?.image}
        fallbackIcon={<Icon name={IconNames.Issue} height={rem(72)} style={{ color: 'var(--mantine-color-accent-4)' }} />}
        breadcrumbs={[
            { title: t('header.periodicals'), href: `/libraries/${libraryId}/explore/periodicals`, icon: IconNames.Periodical },
            { title: periodical?.title, href: `/libraries/${libraryId}/periodicals/${periodicalId}`, icon: IconNames.Periodical },
        ]}
        meta={
            <Group gap="xs">
                {periodical?.frequency && <Badge variant="light">{t(`periodical.frequency.${periodical.frequency.toLowerCase()}`)}</Badge>}
                <Badge variant="light" color="violet">{t('issue.articleCount', { count: issue.articleCount })}</Badge>
                <Badge variant="outline" color="gray">{t('issue.pageCount', { count: issue.pageCount })}</Badge>
            </Group>
        }
        primaryAction={issue.articleCount > 0 ? (
            <Button component={Link}
                to={`/libraries/${libraryId}/periodicals/${periodicalId}/volumes/${volumeNumber}/issues/${issueNumber}/articles/1`}
                leftSection={<IconReaderText />}>
                {t('issue.readIssue')}
            </Button>
        ) : null}
        secondaryActions={[<ShareButton key="issue-share-button" title={`${periodical?.title} - ${title}`} />]}
        tabs={[{
            value: 'contents',
            label: t('issue.articlesTab'),
            content: (
                <Card withBorder>
                    <IssueArticlesList
                        libraryId={libraryId}
                        periodicalId={periodicalId}
                        volumeNumber={volumeNumber}
                        issueNumber={issueNumber}
                        showSearch
                        showTitle={false} />
                </Card>)
        }]} />);
}

export default IssuePage;