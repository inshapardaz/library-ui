import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// 3rd part library
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Box,
    LoadingOverlay,
    Loader,
    Space,
    Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle } from '@tabler/icons-react';

// Local imports
import classes from './loginPage.module.css';
import { useRegisterMutation } from "/src/store/slices/auth.api";

//-----------------------------------------

const RegisterPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [busy, handlers] = useDisclosure(false);
    const [register, { isLoading: isLoading }] = useRegisterMutation();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code') || '';
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false
        },

        validate: {
            name: (value) => (value == null || value == '' ? t('register.name.required') : null),
            email: (value) => {
                if (!value) {
                    return t('register.email.required');
                }

                return (/^\S+@\S+$/.test(value) ? null : t('register.email.error'));
            },
            password: (value) => (value == null || value == '' ? t('register.password.required') : null),
            confirmPassword: (value, values) => {
                if (value == null || value == '')
                    return t('register.confirmPassword.required')
                if (value !== values.password)
                    return t('register.confirmPassword.match')
                return null;
            },
            acceptTerms: (value) => value ? null : t('register.acceptTerms.requires')
        }
    });

    const onSubmit = ({ name, password, acceptTerms }) => {
        handlers.open()
        setError(false)
        register({ code, name, password, acceptTerms })
            .unwrap()
            .then(() => {
                notifications.show({
                    message: t('register.success'),
                    autoClose: 5000,
                    withBorder: true
                })
                navigate('/')
            })
            .catch(() => setError(true))
            .finally(() => handlers.close())
    };

    const errorMessage = error ?
        <>
            <Space h="md" />

            <Alert variant="white" color="red" title={t('register.error')} icon={<IconInfoCircle />} type="error" />
        </>
        : null

    return (
        <Box pos="relative">
            <LoadingOverlay visible={busy || isLoading} loaderProps={{ children: <Loader size={30} /> }} />
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        {t('register.title')}
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        {t('register.loginMessage')}
                        <Anchor size="sm" component={Link} to="/account/login">
                            {t('login.title')}
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label={t('register.name.label')}
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <TextInput label={t('register.email.label')}
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            mt="md"
                            label={t('register.password.label')}
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        <PasswordInput
                            mt="md"
                            label={t('register.confirmPassword.label')}
                            key={form.key('confirmPassword')}
                            {...form.getInputProps('confirmPassword')}
                        />

                        <Space h="md" />
                        <Checkbox label={t('register.acceptTerms.title')}
                            key={form.key('acceptTerms')}
                            {...form.getInputProps('acceptTerms')} />
                        <Space h="md" />

                        <Anchor size="sm" component={Link} to="/account/forgot-password">
                            {t('forgotPassword.title')}
                        </Anchor>

                        <Button fullWidth mt="xl" type='submit'>
                            {t('register.title')}
                        </Button>
                        {errorMessage}
                    </Paper>
                </Container>
            </form>
        </Box >
    );
}

export default RegisterPage;