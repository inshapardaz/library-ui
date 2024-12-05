import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// UI Library Imports
import { Center, Container, Divider, Grid, Group, Image, rem, Skeleton, Space, Stack, Text, Title, useMantineTheme } from "@mantine/core";

// Local Imports
import { useGetPeriodicalByIdQuery } from '@/store/slices/periodicals.api';
import { IconPeriodical } from '@/components/icon';
import IssuesList from "@/components/periodicals/issues/issuessList";
import PeriodicalSideBar from "@/components/periodicals/periodicalSideBar";
import Error from '@/components/error';
import If from '@/components/if'
import PeriodicalFrequency from "@/models/periodicalFrequency";
//-----------------------------------------
const PRIMARY_COL_HEIGHT = rem(300);
//-----------------------------------------
const PeriodicalPage = () => {
    const { t } = useTranslation();
    const { libraryId, periodicalId } = useParams();
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

    const icon = <Center h={450}><IconPeriodical width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (<Container fluid mt="sm">
        <Grid
            mih={50}
        >
            <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                {periodical.links?.image ?
                    <Image
                        src={periodical?.links?.image}
                        h={rem(400)}
                        w="auto"
                        radius="md"
                        alt={periodical?.title}
                        fit='contain'
                    /> :
                    icon
                }
                <If condition={periodical.frequency !== PeriodicalFrequency.Annually}>
                    <PeriodicalSideBar libraryId={libraryId} periodicalId={periodicalId} />
                </If>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                <Stack align="stretch"
                    justify="flex-start"
                    gap="md">
                    <Group>
                        <Title order={3}>{periodical.title}</Title>
                        <Space w="lg" />
                    </Group>
                    <Space h="lg" />
                    {periodical?.description && <Text order={3}>{periodical.description}</Text>}
                    <Divider />
                    <IssuesList libraryId={libraryId}
                        periodicalId={periodicalId}
                        frequency={periodical.frequency}
                        showTitle={true} />
                </Stack>
            </Grid.Col>
        </Grid>
    </Container>);
};

export default PeriodicalPage;