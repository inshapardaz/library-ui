import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import {
    Text,
    Button,
    UnstyledButton,
    Group,
    rem,
    Collapse,
    Center,
    Card,
    Anchor,
    SimpleGrid,
    Divider,
    Popover,
    Breadcrumbs,
    Space
}
    from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Local Imports
import { useGetLibrariesQuery } from '@/store/slices/libraries.api'
import classes from './librarySwitcher.module.css';
import {
    IconRefreshAlert,
    IconLibrary,
    IconLibraryEditor,
    IconChevronDown
} from '@/components/icon';
//------------------------------------

const LibrarySwitcher = ({ className, library, onClick = () => { }, children }) => {
    const { t } = useTranslation();
    const [opened, setOpened] = useState(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { data: libraries, isFetching, isError: errorLoadingLibraries, refetch: refetchLibraries } = useGetLibrariesQuery({})


    if (errorLoadingLibraries) {
        return <Button click={refetchLibraries}
            leftSection={<IconRefreshAlert style={{ color: 'var(--mantine-color-red-9)' }} />}
        />
    }

    const links = libraries ? libraries.data.map((item) => (
        <UnstyledButton key={item.id} className={classes.item} onClick={onClick}
            component={Link} to={`/libraries/${item.id}`}>
            <IconLibrary style={{
                width: rem(22), height: rem(22)
            }} />
            <Text size="xs" mt={7} className={classes.title}>
                {item.name}
            </Text>
        </UnstyledButton>
    )) : [];

    const items = [
        { title: t('header.libraries'), href: '/libraries' },
        { title: library?.name, href: '#' },
    ].map((item, index) => (
        <Link to={item.href} key={index} className={classes.title}>
            {item.title}
        </Link>
    ));

    return (
        <>
            <Popover width={600} position="bottom" radius="md" shadow="md" mx="md" disabled={isFetching} withinPortal visibleFrom="sm"
                onChange={setOpened}>
                <Popover.Target>
                    <Center className={className}>
                        {children}
                        <Space w="lg" />
                        <IconChevronDown
                            width={rem(16)}
                            height={rem(16)}
                            style={{
                                transform: opened ? "rotate(180deg)" : "rotate(0)",
                                transitionDuration: "250ms"
                            }}
                        />
                    </Center>
                </Popover.Target>

                <Popover.Dropdown style={{ overflow: 'hidden' }}>
                    <Card radius="md" className={classes.card}>
                        <Group justify="space-between">
                            <Breadcrumbs visibleFrom="lg">{items}</Breadcrumbs>
                            <Anchor size="xs" component={Link} to={'/libraries'} c="dimmed" style={{ lineHeight: 1 }}>
                                {t('libraries.viewAll')}
                            </Anchor>
                        </Group>
                        <Divider my="sm" />
                        <SimpleGrid cols={3} mt="md">
                            {links}
                        </SimpleGrid>
                    </Card>
                    <div className={classes.dropdownFooter}>
                        <Group justify="space-between">
                            <div>
                                <Group>
                                    <IconLibraryEditor height="24px" />
                                    <Text fw={500} fz="sm">
                                        {t('header.libraryEditor')}
                                    </Text>
                                </Group>
                                <Text size="xs" c="dimmed">
                                    {t('library.edit')}
                                </Text>
                            </div>
                            <Button variant="default"
                                component={Link}
                                to={library && library.links.update ? `https://editor.nawishta.co.uk/libraries/${library.id}` : "https://editor.nawishta.co.uk/"}>
                                {t('header.libraryEditor')}
                            </Button>
                        </Group>
                    </div>
                </Popover.Dropdown>
            </Popover>
            <UnstyledButton className={classes.link} onClick={toggleLinks} hiddenFrom="sm">
                {children}
            </UnstyledButton>
            <Collapse in={linksOpened} hiddenFrom="sm">{links}</Collapse>
        </>);
}

LibrarySwitcher.propTypes = {
    className: PropTypes.string,
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        links: PropTypes.shape({
            update: PropTypes.any,
        })
    }),
    onClick: PropTypes.func,
    children: PropTypes.any,
};

export default LibrarySwitcher;