import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library imports
import { ActionIcon, Tooltip } from '@mantine/core';

// Local imports
import { IconShare } from '@/components/icon';
import { success } from '@/utils/notifications';

//------------------------------

// Shares the current page: the device share sheet when there is one, otherwise the link is
// copied to the clipboard. Same position and appearance on every detail page.
const ShareButton = ({ title, size = 24 }) => {
    const { t } = useTranslation();

    const share = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title, url });
            } else {
                await navigator.clipboard.writeText(url);
                success({ title: t('detail.linkCopied') });
            }
        } catch {
            // the user dismissed the share sheet, or the clipboard is unavailable
        }
    };

    return (
        <Tooltip label={t('detail.share')}>
            <ActionIcon variant="transparent" aria-label={t('detail.share')} onClick={share}>
                <IconShare height={size} />
            </ActionIcon>
        </Tooltip>
    );
};

ShareButton.propTypes = {
    title: PropTypes.string,
    size: PropTypes.number,
};

export default ShareButton;
