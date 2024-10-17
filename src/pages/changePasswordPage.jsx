import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

// 3rd part library
import {
    PasswordInput,
    Paper,
    Title,
    Container,
    Button,
    Box,
    LoadingOverlay,
    Loader,
    Alert,
    Space,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from '@mantine/notifications';

// Local imports
import classes from './changePasswordPage.module.css';

import { useChangePasswordMutation } from "@/store/slices/auth.api";
import { IconInfoCircle } from "@/components/icon";


//--------------------------------

const ChangePasswordPage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [busy, handlers] = useDisclosure(false);
    const [changePassword, { isLoading: isLoading }] = useChangePasswordMutation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            oldPassword: '',
            password: '',
            confirmPassword: ''
        },

        validate: {
            oldPassword: (value) => (value == null || value == '' ? t('changePassword.oldPassword.required') : null),
            password: (value) => (value == null || value == '' ? t('changePassword.password.required') : null),
            confirmPassword: (value, values) => {
                if (value == null || value == '')
                    return t('changePassword.confirmPassword.required')
                if (value !== values.password)
                    return t('changePassword.confirmPassword.match')
                return null;
            }
        }
    });

    const onSubmit = ({ oldPassword, password }) => {
        handlers.open()
        setError(false)
        changePassword({ password, oldPassword })
            .unwrap()
            .then(() => {
                notifications.show({
                    message: t('changePassword.success'),
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

            <Alert variant="white" color="red" title={t('changePassword.error')}
                icon={<IconInfoCircle />}
                type="error" />
        </>
        : null

    return (
        <Box pos="relative">
            <LoadingOverlay visible={busy || isLoading} loaderProps={{ children: <Loader size={30} /> }} />
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        {t('changePassword.title')}
                    </Title>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <PasswordInput
                            mt="md"
                            label={t('changePassword.oldPassword.label')}
                            key={form.key('oldPassword')}
                            {...form.getInputProps('oldPassword')}
                        />
                        <PasswordInput
                            mt="md"
                            label={t('changePassword.password.label')}
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        <PasswordInput
                            mt="md"
                            label={t('changePassword.confirmPassword.label')}
                            key={form.key('confirmPassword')}
                            {...form.getInputProps('confirmPassword')}
                        />

                        <Button fullWidth mt="xl" type='submit'>
                            {t('changePassword.submit')}
                        </Button>

                        {errorMessage}
                    </Paper>
                </Container>
            </form>
        </Box>
    );
}

export default ChangePasswordPage;