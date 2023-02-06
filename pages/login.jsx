import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

// 3rd party libraries
import { App, Button, Form, Input, Space, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/common.module.scss'
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

// ---------------------------------------------------
function LoginPage() {
  const { message } = App.useApp();
  const t = useTranslations()
  const router = useRouter();
  const isAuthenticated = useAuth(false);
  const [busy, setBusy] = useState(false);

  if (isAuthenticated)  router.push('/')

  const onSubmit = ({ email, password }) => {
    setBusy(true);
    signIn('credentials', { callbackUrl: '/' , email, password })
      .catch(() => message.error(t('login.error')))
      .finally(() => setBusy(false));
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
              placeholder={t('login.password')}
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
export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`@/i18n/${locale ?? 'en'}.json`)).default
  },
})

LoginPage.Layout = LayoutWithFooter;
export default LoginPage;