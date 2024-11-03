import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

// Ui Library Import
import { Anchor, Group, Pill, useMantineTheme } from "@mantine/core";

// Local imports
import { IconCategory } from '@/components/icon';
//-----------------------------------------

const CategoriesList = ({ categories, size }) => {
    const { libraryId } = useParams();
    const theme = useMantineTheme();

    if (categories == null || categories.length < 1) return null;
    return (
        <Group>
            <IconCategory height={size} style={{ color: theme.colors.dark[2] }} />
            {categories.map((category) => (
                <Anchor key={category.id} component={Link} to={`/libraries/${libraryId}/books?category=${category.id}`}>
                    <Pill>{category.name}</Pill >
                </Anchor>
            ))}
        </Group>)
}


CategoriesList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    size: PropTypes.any,
};

export default CategoriesList;