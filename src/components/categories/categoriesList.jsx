import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

// Ui Library Import
import { Anchor, Pill, Stack } from "@mantine/core";

// Local imports
import { IconTags } from '@/components/icon';
//-----------------------------------------

const CategoriesList = ({ categories }) => {
    const { libraryId } = useParams();
    if (categories == null || categories.length < 1) return null;
    return (
        <Stack>
            {categories.map((category) => (
                <Anchor key={category.id} component={Link} to={`/libraries/${libraryId}/books?category=${category.id}`}>
                    <IconTags />

                    <Pill>{category.name}</Pill >
                </Anchor>
            ))}
        </Stack>)
}


CategoriesList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default CategoriesList;