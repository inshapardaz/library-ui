import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library Import
import { Group, Text } from "@mantine/core";

// Local imports
//-----------------------------------------

const IconText = ({ text, icon, link, type = 'dimmed' }) => {
    if (link) {
        return (<Group wrap='nowrap' component={Link} to={link} gap="sm" style={{ textDecoration: 'none' }}>
            {icon}
            <Text truncate="end" c={type}>{text}</Text>
        </Group>);
    }

    return (<Group gap="sm">
        {icon}
        <Text c={type}>{text}</Text>
    </Group>);
}

IconText.propTypes = {
    icon: PropTypes.object,
    link: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string
};

export default IconText;