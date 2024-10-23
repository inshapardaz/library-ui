import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import {
    Text,
    Button,
    UnstyledButton,
    Group,
    useMantineTheme,
    rem,
    Collapse,
    Center,
    Card,
    Anchor,
    SimpleGrid,
    HoverCard
}
    from '@mantine/core';

// Local Imports
import { useGetLibrariesQuery } from '@/store/slices/libraries.api'
import classes from './librarySwitcher.module.css';
import {
    IconRefreshAlert,
    IconLibrary,
} from '../icon';
import { useDisclosure } from '@mantine/hooks';
//------------------------------------

const LibrarySwitcher = ({ className, children }) => {
    const { t } = useTranslation();
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { data: libraries, isFetching, isError: errorLoadingLibraries, refetch: refetchLibraries } = useGetLibrariesQuery({})
    const theme = useMantineTheme();


    if (errorLoadingLibraries) {
        return <Button click={refetchLibraries}
            leftSection={<IconRefreshAlert style={{ color: 'var(--mantine-color-red-9)' }} />}
        />
    }

    const links = libraries ? libraries.data.map((item) => (
        <UnstyledButton key={item.id} className={classes.item}
            component={Link} to={`/libraries/${item.id}`}>
            <IconLibrary style={{
                width: rem(22), height: rem(22), color: theme.colors.blue[6]
            }} />
            <Text size="xs" mt={7}>
                {item.name}
            </Text>
        </UnstyledButton>
    )) : [];

    return (
        <>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" disabled={isFetching} withinPortal visibleFrom="sm" >
                <HoverCard.Target>
                    <Center className={className}>
                        {children}
                    </Center>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                    <Card radius="md" className={classes.card}>
                        <Group justify="space-between">
                            <Text className={classes.title}>{t('header.libraries')}</Text>
                            <Anchor size="xs" component={Link} to={'/libraries'} c="dimmed" style={{ lineHeight: 1 }}>
                                {t('libraries.viewAll')}
                            </Anchor>
                        </Group>
                        <SimpleGrid cols={3} mt="md">
                            {links}
                        </SimpleGrid>
                    </Card>
                </HoverCard.Dropdown>
            </HoverCard>
            <UnstyledButton className={classes.link} onClick={toggleLinks} hiddenFrom="sm">
                {children}
            </UnstyledButton>
            <Collapse in={linksOpened} hiddenFrom="sm">{links}</Collapse>
        </>);
}

LibrarySwitcher.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default LibrarySwitcher;