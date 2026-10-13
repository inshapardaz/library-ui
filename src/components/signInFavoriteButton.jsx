import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { ActionIcon, Tooltip, useMantineTheme } from "@mantine/core";

// Local imports
import { IconFavorite } from '@/components/icon';
import useRequireLogin from '@/hooks/useRequireLogin';
//---------------------------------------

// What the favorite button becomes for a signed-out visitor: the API offers no favorite links
// to them, so this heart sends them to login and back to the same page instead.
const SignInFavoriteButton = ({ size }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { requireLogin } = useRequireLogin();

    return (
        <Tooltip label={t('login.signInToUse')}>
            <ActionIcon variant="transparent" aria-label={t('login.signInToUse')} onClick={requireLogin(() => { })}>
                <IconFavorite height={size} style={{ color: theme.colors.dark[3] }} />
            </ActionIcon>
        </Tooltip>
    );
};

SignInFavoriteButton.propTypes = {
    size: PropTypes.any,
};

export default SignInFavoriteButton;
