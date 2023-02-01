import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

// 3rd party libraries
import { App, Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import useAuth from '@/hooks/useAuth';
import styles from '../styles/common.module.scss'
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
        <Form name="login" className={styles["login-form"]} onFinish={onSubmit}
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
            <Link className={styles["login-form-forgot"]} href="/forgot-password">
              {t('forgotPassword.title')}
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              {t('login.title')}
            </Button>
            Or <Link href="/register">{t('register.title')}</Link>
          </Form.Item>
        </Form>
    </FullPageFormContainer>
  );
}
export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`../i18n/${locale ?? 'en'}.json`)).default
  },
})

LoginPage.Layout = LayoutWithFooter;
export default LoginPage;