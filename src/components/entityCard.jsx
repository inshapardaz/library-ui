import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Ui Library Imports
import { Box, Card, Text } from '@mantine/core';

// Local Imports
import classes from './entityCard.module.css';
//---------------------------------------

// The design's card for an author, series or periodical: a tinted tile (the image, or an icon)
// over a caption with the name and a line of facts.
const EntityCard = ({ to, name, image, icon, aspect = '1', meta }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <Card padding={0} shadow="xs" h="100%" className={classes.card} style={{ overflow: 'hidden' }}>
            <Link to={to} className={classes.tile} style={{ aspectRatio: aspect }} aria-label={name}>
                {image && !imgError
                    ? <img src={image} alt="" loading="lazy" onError={() => setImgError(true)} />
                    : icon}
            </Link>
            <Box p="md">
                <Text component={Link} to={to} fw={600} fz="md" lineClamp={2} display="block" c="inherit" td="none">{name}</Text>
                {meta}
            </Box>
        </Card>
    );
};

EntityCard.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.node,
    aspect: PropTypes.string,
    meta: PropTypes.node,
};

export default EntityCard;
