import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import { Card, Center, Divider, NavLink, SimpleGrid, Skeleton, useMantineTheme } from '@mantine/core';

// Local imports
import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import { IconCategory, IconFavorite, IconBook } from '@/components/icon';

//----------------------------------------------
const BooksSideBar = ({ selectedCategory }) => {
    const { t } = useTranslation();
    const { libraryId } = useParams();
    const theme = useMantineTheme();

    const { data: categories, isFetching, error }
        = useGetCategoriesQuery({ libraryId }, { skip: libraryId == null });

    if (isFetching) {
        return (<Card withBorder m="sm">
            <SimpleGrid
                cols={1}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                {Array(12).fill(1).map((_, index) => <Skeleton key={index} height={32} />)}
            </SimpleGrid>
        </Card>);
    }

    if (error) {
        return (<Card withBorder m="sm">
            <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">

            </Center>
        </Card>)
    }

    if (!categories || !categories.data || categories.data.length < 1) {
        return (<Card withBorder m="sm">
            <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
                {t('categories.empty.title')}
            </Center>
        </Card>)
    }

    return (<Card withBorder m="sm">
        <NavLink
            key="favorites"
            component={Link}
            to={`/libraries/${libraryId}/books?favorite=true`}
            label={t('book.favorites')}
            leftSection={<IconFavorite style={{ color: theme.colors.red[9] }} />}
        />
        <NavLink
            key="read"
            component={Link}
            to={`/libraries/${libraryId}/books?read=true`}
            label={t('book.lastRead')}
            leftSection={<IconBook style={{ color: theme.colors.green[9] }} />}
        />
        <Divider />
        {
            categories.data.map(category => (<NavLink
                key={category.id}
                component={Link}
                active={selectedCategory == category.id}
                to={`/libraries/${libraryId}/books?category=${category.id}`}
                label={category.name}
                description={t('categories.bookCount', { count: category.bookCount })}
                leftSection={<IconCategory />}
            />))
        }
    </Card>);
}

BooksSideBar.propTypes = {
    selectedCategory: PropTypes.string
};

export default BooksSideBar;