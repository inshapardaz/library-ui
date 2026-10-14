import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Import
import { Button, Container, Group, Text, Title } from '@mantine/core';

// Local import
import { LibraryContext } from '@/contexts'
import classes from './header.module.css';
//-------------------------

// The top of the library home: its name and description, and the way into its content.
const LibraryHeader = () => {
    const { t } = useTranslation();
    const { library } = useContext(LibraryContext);

    if (!library) return null;

    const base = `/libraries/${library.id}/explore`;

    return (
        <div className={classes.wrapper}>
            <Container fluid px="lg" py="xl">
                <Title order={1} className={classes.title}>{library.name}</Title>
                {library.description && <Text size="lg" maw={640} mt="xs" className={classes.description}>{library.description}</Text>}
                <Group mt="md">
                    <Button component={Link} to={`${base}/books`} className={classes.control}>{t('header.books')}</Button>
                    <Button component={Link} to={`${base}/writings`} className={classes.secondaryControl}>{t('header.writings')}</Button>
                    <Button component={Link} to={`${base}/poetry`} className={classes.secondaryControl}>{t('header.poetry')}</Button>
                </Group>
            </Container>
        </div>
    );
}

export default LibraryHeader;
