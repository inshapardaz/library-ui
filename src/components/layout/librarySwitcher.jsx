import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import cx from 'clsx';

// Ui Library imports
import {
    Text,
    Button,
    UnstyledButton,
    Group,
    ThemeIcon,
    useMantineTheme,
    rem,
    Collapse,
    Center,
    Menu
}
    from '@mantine/core';

// Local Imports
import { useGetLibrariesQuery } from '@/store/slices/libraries.api'
import classes from './appHeader.module.css';
import { IconRefreshAlert, IconBooks, IconChevronDown, IconChevronUp } from '../icon';
import { useDisclosure } from '@mantine/hooks';
//------------------------------------

const LibrarySwitcher = ({ className, children }) => {
    const { t } = useTranslation();
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [menuOpened, setMenuOpened] = useState(false);
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
        <Menu openDelay={100} closeDelay={400}
            opened={menuOpened} onChange={setMenuOpened}
            transitionProps={{ transition: 'scale-y', duration: 150 }}
            withinPortal
            visibleFrom="sm">
            <Menu.Target className={className}>
                <Center inline>
                    {children}
                    {menuOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                </Center>
            </Menu.Target>
            <Menu.Dropdown>
                {
                    libraries && libraries.data.map((item) => (
                        <Menu.Item key={item.id}
                            component={Link}
                            to={`/libraries/${item.id}`}
                            leftSection={<IconBooks style={{ width: rem(22), height: rem(22), color: theme.colors.blue[6] }} />}>
                            {item.name}
                        </Menu.Item>))
                }
                <Menu.Divider />
                <Menu.Item component={Link}
                    to={'/libraries'}>
                    {t('libraries.viewAll')}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
        <Group h="100%" gap={0} hiddenFrom="sm" >
            <Button className={classes.link}
                onClick={toggleLinks}
                variant='transparent'
                justify="space-between"
                fullWidth
                rightSection={linksOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />} >
                {children}
            </Button>
            <Collapse in={linksOpened} style={{ paddingLeft: rem(16), paddingRight: rem(16) }}>
                {links}
                <UnstyledButton key='all'
                    className={classes.subLink}
                    component={Link} to={`/libraries`}>
                    <Group wrap="nowrap" align="flex-start">
                        <div>
                            <Text size="sm" fw={500}>
                                {t('libraries.viewAll')}
                            </Text>
                        </div>
                    </Group>
                </UnstyledButton>
            </Collapse>
        </Group>
    </>);
}

LibrarySwitcher.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default LibrarySwitcher;