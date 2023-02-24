import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

// 3rd party libraries
import { App, Button, Form, Input, Space, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
//import useAuth from '../hooks/useAuth';
import styles from '../styles/common.module.scss';
import FullPageFormContainer from '../components/layout/fullPageFormContainer';

// ---------------------------------------------------------------

const Login = () => {
    const { message } = App.useApp();
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [busy, setBusy] = useState(false);

    //if (isAuthenticated)  navigate('/')

    const onSubmit = ({ email, password }) => {
        //setBusy(true);
        //signIn('credentials', { callbackUrl: '/' , email, password })
        //.catch(() => message.error(t('login.error')))
        //.finally(() => setBusy(false));
    };

    return (
        <FullPageFormContainer title={t('login.title')}>
            <Form name="login" onFinish={onSubmit}
            >
            <Form.Item name="email"
                rules={[
                {
                    required: true,
                    message: t('login.email.required'),
                },
                {
                    type: 'email',
                    message: t('login.email.error'),
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('login.email.title')} />
            </Form.Item>
            <Form.Item name="password"
                rules={[
                {
                    required: true,
                    message: t('login.password.required'),
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t('login.password.title')}
                />
            </Form.Item>
            <Form.Item>
                <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" htmlType="submit" block>
                    {t('login.title')}
                </Button>
                <Divider  />
                <Button href="/forgot-password" type="text" block>
                    {t('forgotPassword.title')}
                </Button>
                <Button href="/" type="text" block>{t('header.home')}</Button>
                <Button href="/register" type="text" block>{t('register.title')}</Button>
                </Space>
            </Form.Item>
            </Form>
        </FullPageFormContainer>
    );
}

export default Login;