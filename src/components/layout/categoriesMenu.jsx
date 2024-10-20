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
    rem,
    useMantineTheme,
    Button,
    Center,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

// Local imports
import classes from './appHeader.module.css';

import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import { IconCategory, IconRefreshAlert } from '../icon';

//----------------------------------------------

const CategoriesMenu = ({ library, children }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { data: categories, isFetching, error }
        = useGetCategoriesQuery({ libraryId: library.id }, { skip: library == null });

    const categoriesList = categories?.data?.map ? categories.data.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.name} component={Link} to={`/libraries/${library.id}/books?category=${item.id}`}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <IconCategory style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.name}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    )) : [];

    if (!library) return null;
    return (
        <>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" disabled={isFetching} withinPortal visibleFrom="sm">
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
                                <Link to={`/libraries/${library.id}/categories`} fz="xs">
                                    {t('categories.all')}
                                </Link>
                            </Group>

                            <Divider my="sm" />

                            <SimpleGrid cols={2} spacing={0}>
                                {categoriesList.length > 0 ? categoriesList : <Text c="dimmed">{t('categories.empty.title')}</Text>}
                            </SimpleGrid>
                        </>
                    }
                </HoverCard.Dropdown>
            </HoverCard>
            <UnstyledButton className={classes.link} onClick={toggleLinks} hiddenFrom="sm">
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
    children: PropTypes.any
};


export default CategoriesMenu;