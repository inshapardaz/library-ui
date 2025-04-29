import { useTranslation } from 'react-i18next';

// ui library
import { Overlay, Container, Title, Button, Text, Card } from '@mantine/core';
import LibrariesList from "@/components/library/librariesList";

// Local imports
import classes from './homePage.module.css';

// ------------------------------------------------------------------

const HomePage = () => {
    const { t } = useTranslation();
    return (<>
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container} size="md">
                <Title className={classes.title}>
                    {t('app')}
                </Title>
                <Text className={classes.description} size="xl" mt="xl">
                    {t('slogan')}
                </Text>

                <Button variant="gradient" size="xl" radius="xl" className={classes.control}
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
