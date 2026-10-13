import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// UI library imports
import { Badge, Box, Button, Card, Group, Stack, Text, Title } from '@mantine/core';

// Local imports
import BookFormat from '@/models/bookFormat';
import { IconFile, IconReaderText } from '@/components/icon';
//------------------------------------------------------

const FORMAT_LABELS = {
    [BookFormat.Epub]: 'EPUB',
    [BookFormat.Pdf]: 'PDF',
    [BookFormat.Markdown]: 'MD',
    [BookFormat.Text]: 'TXT',
    [BookFormat.Html]: 'HTML',
};

// The files a book is available as, each with its format and a Read button.
const BookFiles = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const files = book?.contents ?? [];

    if (files.length === 0) {
        return null;
    }

    return (
        <Stack gap="sm">
            <Title order={3}>{t('bookPage.files')}</Title>
            {files.map((file) => (
                <Card key={file.id ?? file.fileName} padding="sm" shadow="xs">
                    <Group wrap="nowrap" gap="md">
                        <Box w={40} h={40} style={{ display: 'grid', placeItems: 'center', borderRadius: 'var(--mantine-radius-md)', background: 'light-dark(var(--mantine-color-accent-0), var(--mantine-color-dark-6))', color: 'var(--mantine-primary-color-filled)' }}>
                            <IconFile height={20} />
                        </Box>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text fw={600} truncate="end">{file.fileName}</Text>
                        </Box>
                        <Badge variant="light" size="md">{FORMAT_LABELS[file.mimeType] ?? file.mimeType}</Badge>
                        <Button component={Link}
                            to={`/libraries/${libraryId}/books/${book.id}/ebook?format=${encodeURIComponent(file.mimeType)}`}
                            variant="light" size="compact-md" leftSection={<IconReaderText height={16} />}>
                            {t('bookPage.read')}
                        </Button>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
};

BookFiles.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        contents: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            fileName: PropTypes.string,
            mimeType: PropTypes.string,
        })),
    }),
};

export default BookFiles;
