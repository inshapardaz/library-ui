import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

// ui library
import { Group, Title } from "@mantine/core";

// local import
import classes from './logo.module.css';

// --------------------------------------------

const Logo = ({ showName = false }) => {
    const { t } = useTranslation()
    if (showName) {
        return (
            <Group>
                <i className={classes.logo} />
                {/* <Space w="xs" /> */}
                <Title order={5}>{t('app')}</Title>
            </Group>);
    }

    return (<i className={classes.logo} />);
}

Logo.propTypes = {
    showName: PropTypes.bool
};

export default Logo;