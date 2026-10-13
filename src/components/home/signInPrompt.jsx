import { useTranslation } from 'react-i18next';

// Ui Library imports
import { Button, Card, Group, Text } from '@mantine/core';

// Local imports
import { accountUrl } from '@/utils/returnUrl';

//------------------------------

// Takes the place of "continue reading" for anonymous visitors.
const SignInPrompt = () => {
    const { t } = useTranslation();
    return (
        <Card withBorder>
            <Group justify="space-between">
                <Text>{t('homePage.signInPrompt')}</Text>
                <Button component="a" href={accountUrl('/account/login')}>{t('login.signInToContinue.action')}</Button>
            </Group>
        </Card>
    );
};

export default SignInPrompt;
