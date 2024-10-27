import PropTypes from 'prop-types';

// Ui Library Upgrade
import { Image, rem } from "@mantine/core";

// local imports
import AuthorTypes from '@/models/authorTypes'
import { IconUserEdit, IconFeather } from '@/components/icon';

//---------------------------------------
export const AuthorImage = ({ author, height = 450 }) => {
    const icon = author.authorType === AuthorTypes.Poet ? <IconFeather size={200} style={{ fill: "grey" }} /> : <IconUserEdit size={200} style={{ fill: "grey" }} />;

    return (<Image
        src={author?.links?.image || icon}
        h={rem(height)}
        alt={author?.name}
        fallbackSrc={icon} />);
};

AuthorImage.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string,
        authorType: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    }),
    height: PropTypes.number
};

