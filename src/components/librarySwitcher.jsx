import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import cx from 'clsx';

// Ui Library imports
import { Text, Button, UnstyledButton, Group, ThemeIcon, useMantineTheme, HoverCard, Center, Box, Divider, SimpleGrid, Anchor, rem, Collapse, Title } from '@mantine/core';

// Local Imports
import { useGetLibrariesQuery } from '@/store/slices/libraries.api'
import classes from './appHeader.module.css';
import { IconChevronDown, IconRefreshAlert, IconBooks } from './icon';
import { LibraryContext } from '@/contexts'
import { useDisclosure } from '@mantine/hooks';
import Logo from './logo';
//------------------------------------

const LibrarySwitcher = () => {
    const { t } = useTranslation();
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { data: libraries, isError: errorLoadingLibraries, refetch: refetchLibraries } = useGetLibrariesQuery({})
    const { libraryId } = useParams();
    const theme = useMantineTheme();
    const { library } = useContext(LibraryContext)


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
        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal visibleFrom="sm">
            <HoverCard.Target>
                <Center inline>
                    <Logo showName={!libraryId} />
                    {libraryId && <Title order={5}>{library?.name}</Title>}
                    <IconChevronDown
                        size={16}
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
        </HoverCard>
        <Group h="100%" gap={0} hiddenFrom="sm">
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                    <Box component="span" mr={5}>
                        {t('header.libraries')}
                    </Box>
                    <IconChevronDown
                        size={16}
                        style={{ color: theme.colors.blue[6] }}
                    />
                </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
        </Group>
    </>);
}

export default LibrarySwitcher;