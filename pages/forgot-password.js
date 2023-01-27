import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// 3rd party libraries
import { App, Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import styles from '../styles/common.module.scss'
import accountService  from '@/services/accountService';
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

function ForgotPasswordPage() {
  const { message } = App.useApp();
  const { t } = useTranslation()
  const router = useRouter()
  const [busy, setBusy] = useState(false);
  
  const onSubmit = ({ email }, { setSubmitting }) => {
    setBusy(true);
    accountService.forgotPassword(email)
      .then(() => message.success(t('forgotPassword.message.success')))
      .then(() => router.push('/'))
      .catch(() => message.error(t('forgotPassword.message.error')))
      .finally(() => setBusy(false));
  };

  return (
    <FullPageFormContainer title={t('forgot.password')}>
        <Form name="forgot-password" className={styles["login-form"]} onFinish={onSubmit}
        >
          <Form.Item name="email"
            rules={[
              {
                required: true,
                message: t('login.message.email.required'),
              },
              {
                type: 'email',
                message: t('login.message.email.error'),
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('forgotPassword.email.title')} />
          </Form.Item>
          <Form.Item name="password"
            rules={[
              {
                required: true,
                message: t('login.message.password.required'),
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
            <Link className={styles["login-form-forgot"]} href="/login">
              {t('login')}
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
            {t('forgotPassword.submit')}
            </Button>
            Or <Link href="/register">{t('register')}</Link>
          </Form.Item>
        </Form>
    </FullPageFormContainer>
  );
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})

ForgotPasswordPage.Layout = LayoutWithFooter;
export default ForgotPasswordPage;