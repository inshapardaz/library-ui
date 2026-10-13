import { useTranslation } from 'react-i18next';

// 3rd party library
import { Title, Text, Button, Container, Group } from '@mantine/core';

// Local imports
import classes from './error403.module.css';
import { accountUrl } from '@/utils/returnUrl';
//--------------------------------

// Shown to signed-out visitors who reach a members-only (private) library. The API answers 403
// both to them and to signed-in non-members, so the caller picks this page or Error403Page
// based on the auth state.
const SignInToContinuePage = () => {
    const { t } = useTranslation();
    return (
        <Container className={classes.root}>
            <Title className={classes.title}>{t('login.signInToContinue.title')}</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                {t('login.signInToContinue.description')}
            </Text>
            <Group justify="center">
                <Button size="md" component="a" href={accountUrl('/account/login')}>
                    {t('login.signInToContinue.action')}
                </Button>
            </Group>
        </Container>
    );
};

export default SignInToContinuePage;
