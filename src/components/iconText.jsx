import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui Library Import
import { Group, Text, Tooltip } from "@mantine/core";

// Local imports
//-----------------------------------------

const IconText = ({ text, icon, link, tooltip, type = 'dimmed' }) => {
    if (link) {
        if (tooltip) {
            return (<Tooltip label={tooltip}>
                <Group wrap='nowrap' component={Link} to={link} gap="sm" style={{ textDecoration: 'none' }}>
                    {icon}
                    <Text truncate="end" c={type}>{text}</Text>
                </Group>
            </Tooltip>);
        }

        return (<Group wrap='nowrap' component={Link} to={link} gap="sm" style={{ textDecoration: 'none' }}>
            {icon}
            <Text truncate="end" c={type}>{text}</Text>
        </Group>);
    }

    if (tooltip) {
        return (<Tooltip label={tooltip}>
            <Group gap="sm">
                {icon}
                <Text c={type}>{text}</Text>
            </Group>
        </Tooltip>)
    }

    return (<Group gap="sm">
        {icon}
        <Text c={type}>{text}</Text>
    </Group>);
}

IconText.propTypes = {
    icon: PropTypes.object,
    link: PropTypes.string,
    text: PropTypes.any,
    tooltip: PropTypes.string,
    type: PropTypes.string
};

export default IconText;