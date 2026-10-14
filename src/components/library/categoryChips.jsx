import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui library imports
import { Group, Text, Title } from '@mantine/core';

// Local imports
import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import classes from './categoryChips.module.css';
//----------------------------------------------

const CategoryChips = ({ libraryId }) => {
    const { t } = useTranslation();
    const { data: categories } = useGetCategoriesQuery({ libraryId }, { skip: libraryId == null });

    const list = categories?.data?.filter(c => c.bookCount > 0) ?? [];
    if (list.length === 0) return null;

    return (<Group gap="xs" align="flex-start">
        <Title order={3} w="100%">{t('header.categories')}</Title>
        <Group gap="xs">
            {list.map(category => (
                <Text key={category.id} component={Link} to={`/libraries/${libraryId}/books?category=${category.id}`} className={classes.chip}>
                    {category.name}
                    <span className={classes.count}>{category.bookCount}</span>
                </Text>
            ))}
        </Group>
    </Group>);
}

CategoryChips.propTypes = {
    libraryId: PropTypes.string
};

export default CategoryChips;
