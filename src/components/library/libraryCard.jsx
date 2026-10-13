import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Badge, Box, Button, Card, Group, Text } from '@mantine/core';

// Local Imports
import { IconLibrary } from '@/components/icon';
//-------------------------------------

// A library as a card: icon, name and language, public or members-only, a short description,
// the counts the API reports, and a button to open it (the design's "available libraries").
const LibraryCard = ({ library }) => {
    const { t } = useTranslation();
    const counts = [
        ['bookCount', 'landing.books'],
        ['authorCount', 'landing.authors'],
        ['seriesCount', 'landing.series'],
    ].filter(([field]) => typeof library[field] === 'number');

    return (
        <Card padding="lg" h="100%" shadow="xs">
            <Group justify="space-between" align="flex-start" wrap="nowrap" mb="sm">
                <Group wrap="nowrap" align="flex-start" gap="md" style={{ minWidth: 0 }}>
                    <Box w={44} h={44} style={{ display: 'grid', placeItems: 'center', flexShrink: 0, borderRadius: 'var(--mantine-radius-md)', background: 'light-dark(var(--mantine-color-accent-0), var(--mantine-color-dark-6))', color: 'var(--mantine-primary-color-filled)' }}>
                        <IconLibrary height={24} />
                    </Box>
                    <Box style={{ minWidth: 0 }}>
                        <Text fw={600} fz="lg" lineClamp={2}>{library.name}</Text>
                        {library.language && <Text size="sm" c="dimmed">{t(`languages.${library.language}`)}</Text>}
                    </Box>
                </Group>
                <Badge variant={library.isPublic ? 'light' : 'filled'} color={library.isPublic ? 'accent' : 'gray.1'}
                    c={library.isPublic ? undefined : 'gray.7'} style={{ flexShrink: 0 }}>
                    {library.isPublic ? t('landing.public') : t('landing.members')}
                </Badge>
            </Group>
            <Text size="sm" mb="sm" lineClamp={2} style={{ flex: 1 }}>{library.description}</Text>
            {counts.length > 0 && (
                <Group gap="md" mb="md">
                    {counts.map(([field, key]) => (
                        <Text key={field} size="sm"><Text span fw={700}>{library[field]}</Text> {t(key, { count: '' }).trim()}</Text>
                    ))}
                </Group>
            )}
            <Group justify="flex-end">
                <Button component={Link} to={`/libraries/${library.id}`} variant="light">{t('landing.open')}</Button>
            </Group>
        </Card>
    );
};

LibraryCard.propTypes = {
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        language: PropTypes.string,
        isPublic: PropTypes.bool,
        bookCount: PropTypes.number,
        authorCount: PropTypes.number,
        seriesCount: PropTypes.number,
    })
}

export default LibraryCard;
