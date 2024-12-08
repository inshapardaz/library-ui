import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// ui library imports
import {
    HoverCard,
    Group,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Divider,
    Collapse,
    Button,
    Center,
    NavLink,
    Badge,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local imports
import classes from './appHeader.module.css';

import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import { IconCategory, IconRefreshAlert } from '@/components/icon';
import If from '@/components/if'

//----------------------------------------------

const CategoriesMenu = ({ library, className, target, allLabel, extraLinks, children, filter = i => i, onClick = () => { } }) => {
    const { t } = useTranslation();
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { data: categories, isFetching, error }
        = useGetCategoriesQuery({ libraryId: library.id }, { skip: library == null });

    const categoriesList = categories?.data?.map ? categories.data.filter(filter).map((item) => (
        <UnstyledButton className={classes.subLink} key={item.name} onClick={onClick} >
            <Group wrap="nowrap" align="flex-start">
                <NavLink
                    key={item.id}
                    component={Link}
                    to={`/libraries/${library.id}/${target}?category=${item.id}`}
                    label={item.name}
                    rightSection={
                        <Badge size="xs" color='gray' circle>
                            {item.periodicalCount}
                        </Badge>
                    }
                    leftSection={<ThemeIcon size={34} variant="default" radius="md">
                        <IconCategory height={22} />
                    </ThemeIcon>}
                />
            </Group>
        </UnstyledButton>
    )) : [];

    if (!library) return null;
    return (
        <>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" disabled={isFetching} withinPortal visibleFrom="sm" className={className}>
                <HoverCard.Target>
                    <Center>
                        {children}
                    </Center>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                    {error ?
                        <>
                            <Text c="dimmed">{t('categories.errors.loading.subTitle')}</Text>
                            <Button rightSection={<IconRefreshAlert />}>{t('actions.retry')}</Button>
                        </> :
                        <>
                            <Group justify="space-between" px="md">
                                <Text fw={500}>{t('header.categories')}</Text>
                                <Text component={Link} to={`/libraries/${library.id}/${target}`} fz="sm" onClick={onClick}>
                                    {allLabel}
                                </Text>
                            </Group>

                            <Divider my="sm" />

                            <SimpleGrid cols={2} spacing={0}>
                                {categoriesList.length > 0 ? categoriesList : <Text c="dimmed">{t('categories.empty.title')}</Text>}
                            </SimpleGrid>
                            <If condition={extraLinks}>
                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </If>
                        </>
                    }
                </HoverCard.Dropdown>
            </HoverCard>
            <UnstyledButton className={classes.link} onClick={toggleLinks} hiddenFrom="sm" m={0} p={0}>
                {children}
            </UnstyledButton>
            <Collapse in={linksOpened} hiddenFrom="sm">{categoriesList}</Collapse>
        </>)
}

CategoriesMenu.propTypes = {
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    className: PropTypes.any,
    target: PropTypes.string,
    allLabel: PropTypes.string,
    extraLinks: PropTypes.any,
    children: PropTypes.any,
    filter: PropTypes.func,
    onClick: PropTypes.func
};


export default CategoriesMenu;