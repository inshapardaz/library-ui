import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library Imports
import { Badge, Box, Button, Group, Text } from '@mantine/core';

// Local Imports
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import { IconReaderText } from '@/components/icon';
import classes from './literatureRow.module.css';
//-------------------------------------

// One writing or poem as a row: icon tile, title and author, category and status tags, the
// favorite heart and a Read button (the design's list view for writings and poetry).
const LiteratureRow = ({ libraryId, item, to, icon, favoriteButton }) => {
    const { t } = useTranslation();
    const category = item.categories?.[0]?.name;
    const complete = item.status === 'Completed';

    return (
        <Group wrap="nowrap" gap="md" className={classes.row}>
            <Box className={classes.tile}>{icon}</Box>
            <Box style={{ flex: 1, minWidth: 0 }}>
                <Text component={Link} to={to} fw={600} c="accent" truncate="end" display="block" td="none">
                    {item.title}
                </Text>
                <AuthorsAvatar libraryId={libraryId} authors={item.authors ?? []} />
            </Box>
            <Group gap="xs" wrap="nowrap" visibleFrom="sm">
                {category && <Badge variant="outline" color="gray" size="md">{category}</Badge>}
                <Badge variant={complete ? 'light' : 'filled'} color={complete ? 'accent' : 'gray.1'}
                    c={complete ? undefined : 'gray.7'} size="md">
                    {complete ? t('literature.complete') : t('literature.proofreading')}
                </Badge>
            </Group>
            {favoriteButton}
            <Button component={Link} to={to} variant="light" size="compact-md" leftSection={<IconReaderText height={16} />}>
                {t('literature.read')}
            </Button>
        </Group>
    );
};

LiteratureRow.propTypes = {
    libraryId: PropTypes.string,
    item: PropTypes.shape({
        title: PropTypes.string,
        status: PropTypes.string,
        authors: PropTypes.array,
        categories: PropTypes.array,
    }).isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node,
    favoriteButton: PropTypes.node,
};

export default LiteratureRow;
