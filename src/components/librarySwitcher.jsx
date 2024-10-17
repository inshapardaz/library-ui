import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import cx from 'clsx';

// Ui Library imports
import { Text, Button, UnstyledButton, Group, ThemeIcon, useMantineTheme, HoverCard, Center, Box, Divider, SimpleGrid, Anchor, rem } from '@mantine/core';

// Local Imports
import { useGetLibrariesQuery } from '@/store/slices/libraries.api'
import classes from './appHeader.module.css';
import { IconChevronDown, IconRefreshAlert, IconBooks } from './icon';
//------------------------------------

const LibrarySwitcher = () => {
    const { t } = useTranslation();
    const { data: libraries, isError: errorLoadingLibraries, refetch: refetchLibraries } = useGetLibrariesQuery({})
    const { libraryId } = useParams();
    const theme = useMantineTheme();

    if (errorLoadingLibraries) {
        return <Button click={refetchLibraries}
            leftSection={<IconRefreshAlert style={{ color: 'var(--mantine-color-red-9)' }} />}
        />
    }

    const links = libraries ? libraries.data.map((item) => (
        <UnstyledButton key={item.id}
            className={cx(classes.subLink, { [classes.active]: item.id === libraryId })}
            component={Link} to={`/libraries/${item.id}`}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <IconBooks style={{ width: rem(22), height: rem(22), color: theme.colors.blue[6] }} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.name} {item.id === libraryId}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    )) : [];

    return (<>
        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
            <HoverCard.Target>
                <Center inline>
                    <Box component="span" mr={5}>
                        <IconBooks />
                    </Box>
                    <IconChevronDown
                        width={rem(16)}
                        height={rem(16)}
                    />
                </Center>
            </HoverCard.Target>
            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                    <Text fw={500}>{t('libraries.title')}</Text>
                    <Anchor component={Link} to="/libraries" fz="xs">
                        {t('libraries.viewAll')}
                    </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                    {links}
                </SimpleGrid>
            </HoverCard.Dropdown>
        </HoverCard >
    </>);
}

export default LibrarySwitcher;