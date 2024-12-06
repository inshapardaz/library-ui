import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// UI Library Imports
import { Card, Container, Divider, Grid, Group, rem, Skeleton, useMantineTheme } from "@mantine/core";

// Local Imports
import { useGetPeriodicalByIdQuery } from '@/store/slices/periodicals.api';
import { IconNames, IconIssues } from '@/components/icon'
import IssuesList from "@/components/periodicals/issues/issuessList";
import FrequencyIcon from "@/components/periodicals/frequencyIcon";
import PageHeader from "@/components/pageHeader";
import IconText from "@/components/iconText";
import Error from '@/components/error';
import If from '@/components/if'
//-----------------------------------------
const PRIMARY_COL_HEIGHT = rem(300);
//-----------------------------------------
const PeriodicalPage = () => {
    const { t } = useTranslation();
    const { libraryId, periodicalId, volumeNumber } = useParams();
    const theme = useMantineTheme();
    const {
        data: periodical,
        error: errorLoadingPeriodical,
        isFetching: loadingPeriodical,
        refetch
    } = useGetPeriodicalByIdQuery({
        libraryId,
        periodicalId
    });

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;


    if (loadingPeriodical) {
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

    if (errorLoadingPeriodical) {
        return (<Container fluid mt="sm">
            <Error title={t('book.error.loading.title')}
                detail={t('book.error.loading.detail')}
                onRetry={refetch} />
        </Container>)
    }

    return (<Container fluid mt="sm">
        <PageHeader title={periodical.title}
            imageLink={periodical.links?.image}
            defaultIcon={IconNames.Periodical}
            subTitle={
                <Group>
                    <FrequencyIcon frequency={periodical.frequency} showLabel c="dimmed" size="sm" height={16} style={{ color: theme.colors.gray[6] }} />
                    <If condition={periodical.issueCount > 0}>
                        <>
                            <Divider orientation="vertical" />
                            <IconText icon={<IconIssues height={16} style={{ color: theme.colors.dark[2] }} />} text={t('periodical.issueCount', { count: periodical.issueCount })} />
                        </>
                    </If>
                </Group>
            }
            details={periodical.description}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home },
                { title: t('header.periodicals'), href: `/libraries/${libraryId}/periodicals`, icon: IconNames.Periodicals },
            ]} />

        <Card withBorder>
            <IssuesList libraryId={libraryId}
                periodicalId={periodicalId}
                volumeNumber={volumeNumber}
                frequency={periodical.frequency}
                showTitle={true} />
        </Card>
    </Container>);
};

export default PeriodicalPage;