import PropTypes from 'prop-types';

// Ui Library Upgrade
import { Image, rem } from "@mantine/core";

//---------------------------------------
export const BookImage = ({ book, height = 40 }) => {
    return (<Image
        src={book?.links?.image}
        h={rem(height)}
        alt={book?.title}
        fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" />);
};

BookImage.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    }),
    height: PropTypes.number
};

