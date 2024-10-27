import PropTypes from 'prop-types';

// Ui Library Upgrade
import { Image, rem } from "@mantine/core";

//---------------------------------------
export const SeriesImage = ({ series, height = 450 }) => {
    return (<Image
        src={series?.links?.image}
        h={rem(height)}
        alt={series?.name}
        fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" />);
};

SeriesImage.propTypes = {
    series: PropTypes.shape({
        name: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    }),
    height: PropTypes.number
};

