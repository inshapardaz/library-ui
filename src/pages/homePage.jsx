import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// ui library
import { Badge, Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';

// Local imports
import LibrariesList from "@/components/library/librariesList";
import { useGetLibrariesQuery } from '@/store/slices/libraries.api';
import { accountUrl } from '@/utils/returnUrl';

// ------------------------------------------------------------------

// The landing page, shown at the site root when there are several libraries and none is
// remembered: what the site is, how many libraries it holds, and the libraries themselves.
const HomePage = () => {
    const { t } = useTranslation();
    const user = useSelector((state) => state.auth.user);
    const { data } = useGetLibrariesQuery({ pageSize: 100 });
    const libraries = data?.data ?? [];
    const sum = (field) => libraries.reduce((total, library) => total + (library[field] ?? 0), 0);
    const stats = [
        [t('landing.libraries'), libraries.length],
        [t('header.books'), sum('bookCount')],
        [t('header.authors'), sum('authorCount')],
        [t('header.series'), sum('seriesCount')],
    ].filter(([, value]) => value > 0);

    return (
        <Container size="lg" py="xl">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb="xl">
                <Stack gap="md" justify="center">
                    <Badge variant="light" color="accent" size="lg" w="fit-content">{t('landing.badge')}</Badge>
                    <Title order={1} fz={{ base: 36, md: 52 }} lh={1.2}>{t('landing.title')}</Title>
                    <Text size="lg" maw={520}>{t('slogan')}</Text>
                    <Group>
                        <Button size="md" component="a" href="#libraries-list">{t('landing.browse')}</Button>
                        {!user && (
                            <Button size="md" variant="light" component="a" href={accountUrl('/account/login')}>
                                {t('login.title')}
                            </Button>
                        )}
                    </Group>
                </Stack>
                {stats.length > 0 && (
                    <SimpleGrid cols={2} spacing="md" verticalSpacing="md" style={{ alignContent: 'center' }}>
                        {stats.map(([label, value]) => (
                            <Card key={label} padding="lg" shadow="xs">
                                <Text c="accent" fw={700} fz={32} lh={1.1}>{value.toLocaleString()}</Text>
                                <Text c="dimmed">{label}</Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </SimpleGrid>

            <Group justify="space-between" align="baseline" mb="md" id="libraries-list">
                <Title order={2}>{t('landing.available')}</Title>
                {!user && <Text size="sm" c="dimmed">{t('landing.signInToOpen')}</Text>}
            </Group>
            <LibrariesList pageNumber={1} pageSize={12} showSearch />
        </Container>
    );
};

export default HomePage;
