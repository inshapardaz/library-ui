import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ui libraries
import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    Alert,
    LoadingOverlay,
    Loader,
    Space,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

// Local Import
import classes from './forgotPassword.module.css';
import { useForgetPasswordMutation } from '@/store/slices/auth.api';
import { IconArrowLeft, IconInfoCircle } from '@/components/icon';
//-------------------------------

const ForgotPasswordPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const [busy, handlers] = useDisclosure(false);
    const [forgotPassword, { isLoading: isLoading }] = useForgetPasswordMutation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: ''
        },

        validate: {
            email: (value) => {
                if (!value) {
                    return t('forgotPassword.email.required');
                }

                return (/^\S+@\S+$/.test(value) ? null : t('forgotPassword.email.error'));
            }
        }
    });

    const onSubmit = ({ email }) => {
        console.log('111')
        handlers.open()
        setError(false)
        forgotPassword({ email })
            .unwrap()
            .then(() => {
                notifications.show({
                    message: t('forgotPassword.success'),
                    autoClose: 5000,
                    withBorder: true
                })
                navigate('/account/login')
            })
            .catch(() => setError(true))
            .finally(() => handlers.close())
    };

    const errorMessage = error ? (
        <>
            <Space h="md" />
            <Alert variant="light" color="red" title={t('forgotPassword.error')}
                icon={<IconInfoCircle />}
                type="error" />
        </>)
        : null

    return (
        <Box pos="relative">
            <LoadingOverlay visible={busy || isLoading} loaderProps={{ children: <Loader size={30} /> }} />
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Container size={460} my={30}>
                    <Title className={classes.title} ta="center">
                        {t('forgotPassword.title')}
                    </Title>
                    <Text c="dimmed" fz="sm" ta="center">
                        {t('forgotPassword.message')}
                    </Text>

                    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                        <TextInput label={t('forgotPassword.email.title')}
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <Group justify="space-between" mt="lg" className={classes.controls}>
                            <Anchor c="dimmed" size="sm" className={classes.control} component={Link} to="/account/login">
                                <Center inline>
                                    <IconArrowLeft size={12} stroke={1.5} />
                                    <Box ml={5}>{t('login.title')}</Box>
                                </Center>
                            </Anchor>
                            <Button type="submit" className={classes.control}>
                                {t('forgotPassword.submit')}
                            </Button>
                        </Group>
                        {errorMessage}
                    </Paper>
                </Container>
            </form>
        </Box>
    );
}

export default ForgotPasswordPage;