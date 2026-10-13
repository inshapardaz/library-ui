import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Import
import { Button, Container, Group, Text, Title } from '@mantine/core';

// Local import
import { LibraryContext } from '@/contexts'
//-------------------------

// The top of the library home: its name and description, and the way into its content.
const LibraryHeader = () => {
    const { t } = useTranslation();
    const { library } = useContext(LibraryContext);

    if (!library) return null;

    const base = `/libraries/${library.id}/explore`;

    return (
        <Container fluid px="lg" pt="lg">
            <Title order={1}>{library.name}</Title>
            {library.description && <Text size="lg" maw={640} mt="xs">{library.description}</Text>}
            <Group mt="md">
                <Button component={Link} to={`${base}/books`}>{t('header.books')}</Button>
                <Button component={Link} to={`${base}/writings`} variant="light">{t('header.writings')}</Button>
                <Button component={Link} to={`${base}/poetry`} variant="light">{t('header.poetry')}</Button>
            </Group>
        </Container>
    );
}

export default LibraryHeader;
