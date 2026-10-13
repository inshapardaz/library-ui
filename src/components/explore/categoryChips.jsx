import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import { Button, Chip, Group, ScrollArea, Skeleton } from '@mantine/core';

// Local imports
import { useGetCategoriesQuery } from '@/store/slices/categories.api';

//------------------------------

// Category counts per content type, as returned by the categories endpoint.
const COUNT_FIELD = {
    books: 'bookCount',
    writings: 'articleCount',
    poetry: 'poetryCount',
    periodicals: 'periodicalCount',
};

// Categories as a row of chips. With `to` each chip is a link (Home); with `selected` and
// `onSelect` it is a filter (Explore).
const CategoryChips = ({ libraryId, type, selected = null, onSelect, to }) => {
    const { t } = useTranslation();
    const { data: categories, isFetching, isError } = useGetCategoriesQuery({ libraryId }, { skip: !libraryId });

    if (isFetching) {
        return <Skeleton height={32} radius="xl" />;
    }

    const field = COUNT_FIELD[type];
    const items = (categories?.data ?? []).filter((c) => !field || c[field] > 0);

    if (isError || items.length === 0) {
        return null;
    }

    return (
        <ScrollArea type="never" aria-label={t('explore.categories')}>
            <Group gap="xs" wrap="nowrap">
                {onSelect && (
                    <Chip checked={selected == null} onChange={() => onSelect(null)} variant="light">
                        {t('explore.allCategories')}
                    </Chip>
                )}
                {items.map((category) => to ? (
                    <Button key={category.id} component={Link} to={to(category)} variant="light" radius="xl" size="compact-md">
                        {category.name}
                    </Button>
                ) : (
                    <Chip key={category.id}
                        checked={String(selected) === String(category.id)}
                        onChange={() => onSelect(category.id)}
                        variant="light">
                        {category.name}
                    </Chip>
                ))}
            </Group>
        </ScrollArea>
    );
};

CategoryChips.propTypes = {
    libraryId: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSelect: PropTypes.func,
    to: PropTypes.func,
};

export default CategoryChips;
