import { useTranslation } from 'react-i18next';

// ui library
import { Container, Title, Button, Text, Card } from '@mantine/core';
import LibrariesList from "@/components/library/librariesList";

// Local imports
import classes from './homePage.module.css';

// ------------------------------------------------------------------

const HomePage = () => {
    const { t } = useTranslation();
    return (<>
        <div className={classes.hero}>
            <Container className={classes.container} size="md">
                <Text className={classes.eyebrow}>{t('header.libraries')}</Text>
                <Title className={classes.title}>
                    {t('app')}
                </Title>
                <Text className={classes.description} size="xl" mt="xl">
                    {t('slogan')}
                </Text>

                <Button size="xl" radius="sm" className={classes.control}
                    component="a" href="#libraries-list">
                    {t('actions.seeMore')}
                </Button>
            </Container>
        </div>
        <Card withBorder id="libraries-list"> {/* Added id for bookmark */}
            <LibrariesList />
        </Card>
    </>)
}

export default HomePage;
