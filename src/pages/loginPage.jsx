import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// 3rd part library
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Box,
    LoadingOverlay,
    Loader,
    Alert,
    Space,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';

// Local imports
import { login, reset, getLoginStatus, getLoginError, isLoggedIn } from '../store/slices/authSlice'
import classes from './loginPage.module.css';

//--------------------------------
const LoginPage = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector(isLoggedIn)
    const status = useSelector(getLoginStatus)
    const error = useSelector(getLoginError)
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate('/')
        }
        else {
            dispatch(reset())
        }

    }, [dispatch, isUserLoggedIn, navigate])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },

        validate: {
            email: (value) => {
                if (!value) {
                    return t('login.email.required');
                }

                return (/^\S+@\S+$/.test(value) ? null : t('login.email.error'));
            },
            password: (value) => (value == null ? t('login.password.required') : null)
        }
    });


    const onSubmit = ({ email, password }) => {
        dispatch(login({ email, password }))
    };

    const errorMessage = error ? (
        <>
            <Space h="md" />
            <Alert variant="light" color="red" title={t('login.error')} icon={<IconInfoCircle />} type="error" />
        </>)
        : null

    return (
        <Box pos="relative">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <LoadingOverlay visible={status === 'loading'} loaderProps={{ children: <Loader size={30} /> }} />
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        {t('login.message')}
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        {t('login.registerMessage')}
                        <Anchor size="sm" component={Link} to="/account/register">
                            {t('register.title')}
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label={t('login.email.title')}
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            mt="md"
                            label={t('login.password.title')}
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        {errorMessage}
                        <Group justify="space-between" mt="lg">
                            <Anchor size="sm" component={Link} to="/account/forgot-password">
                                {t('forgotPassword.title')}
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" type='submit'>
                            {t('login.title')}
                        </Button>
                    </Paper>
                </Container>
            </form>
        </Box>
    );
}

export default LoginPage;