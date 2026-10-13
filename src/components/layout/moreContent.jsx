import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import { Box, Divider, Group, NavLink, Stack, Text } from '@mantine/core';

// Local imports
import { LibraryContext } from '@/contexts';
import useLibraryCount from '@/hooks/useLibraryCount';
import ColorModeMenu from './colorModeMenu';
import AppearancePanel from './appearancePanel';
import LanguageToggle from './languageToggle';
import Profile from './profile';
import { IconLibrary, IconLibraryEditor, IconDictionary, IconFont, IconTools } from '@/components/icon';

//------------------------------

const EXTERNAL_TOOLS = [
    { key: 'dictionaries', href: 'https://dictionary.nawishta.co.uk', icon: <IconDictionary height="20px" /> },
    { key: 'fonts', href: 'https://fonts.nawishta.co.uk', icon: <IconFont height="20px" /> },
    { key: 'tools', href: 'https://tools.nawishta.co.uk', icon: <IconTools height="20px" /> },
];

// The "More" destination: switching library, links to the sibling tools, and preferences.
// `compact` leaves out the preferences and profile for the desktop popover, where they already
// sit in the header.
const MoreContent = ({ compact = false, onNavigate = () => { } }) => {
    const { t } = useTranslation();
    const { library } = useContext(LibraryContext) ?? {};
    const { count } = useLibraryCount();
    const editorLink = library?.links?.update
        ? `https://editor.nawishta.co.uk/libraries/${library.id}`
        : null;

    return (
        <Stack gap="xs">
            {count > 1 && (
                <NavLink component={Link} to="/libraries" label={t('nav.switchLibrary')}
                    leftSection={<IconLibrary height="20px" />} onClick={onNavigate} />
            )}
            <Text size="xs" c="dimmed" px="sm">{t('nav.externalTools')}</Text>
            {EXTERNAL_TOOLS.map((tool) => (
                <NavLink key={tool.key} component="a" href={tool.href} label={t(`header.${tool.key}`)}
                    leftSection={tool.icon} />
            ))}
            {editorLink && (
                <NavLink component="a" href={editorLink} label={t('header.libraryEditor')}
                    leftSection={<IconLibraryEditor height="20px" />} />
            )}
            {!compact && (
                <>
                    <Divider />
                    <Text size="xs" c="dimmed" px="sm">{t('nav.preferences')}</Text>
                    <Group px="sm" justify="space-between">
                        <LanguageToggle />
                        <ColorModeMenu />
                    </Group>
                    <Box px="sm"><AppearancePanel /></Box>
                    <Divider />
                    <Group justify="center" grow pb="xl" px="sm">
                        <Profile />
                    </Group>
                </>
            )}
        </Stack>
    );
};

MoreContent.propTypes = {
    compact: PropTypes.bool,
    onNavigate: PropTypes.func,
};

export default MoreContent;
