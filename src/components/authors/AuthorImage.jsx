import PropTypes from 'prop-types';

// Ui Library Upgrade
import { Image, rem } from "@mantine/core";

//---------------------------------------
export const AuthorImage = ({ author, height = 450 }) => {
    return (<Image
        src={author?.links?.image}
        h={rem(height)}
        alt={author?.name}
        fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" />);
};

AuthorImage.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    }),
    height: PropTypes.number
};

