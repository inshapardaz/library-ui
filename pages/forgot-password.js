import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 3rd party libraries
import { App, Button, Form, Input, Space, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import styles from '../styles/common.module.scss'
import accountService  from '@/services/accountService';
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

function ForgotPasswordPage() {
  const { message } = App.useApp();
  const t = useTranslations()
  const router = useRouter()
  const [busy, setBusy] = useState(false);
  
  const onSubmit = ({ email }, { setSubmitting }) => {
    setBusy(true);
    accountService.forgotPassword(email)
      .then(() => message.success(t('forgotPassword.success')))
      .then(() => router.push('/'))
      .catch(() => message.error(t('forgotPassword.error')))
      .finally(() => setBusy(false));
  };

  return (
    <FullPageFormContainer title={t('forgotPassword.title')}>
        <Form name="forgot-password" onFinish={onSubmit}
        >
          <Form.Item name="email"
            rules={[
              {
                required: true,
                message: t('forgotPassword.email.required'),
              },
              {
                type: 'email',
                message: t('forgotPassword.email.error'),
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('forgotPassword.email.title')} />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" className={styles["forgot-form-button"]} block>
              {t('forgotPassword.submit')}
              </Button>
              <Divider />
              <Button className={styles["forgot-form-forgot"]} type="text" block href="/login">
                {t('login.title')}
              </Button>
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
    messages: (await import(`../i18n/${locale ?? 'en' }.json`)).default
  },
})

ForgotPasswordPage.Layout = LayoutWithFooter;
export default ForgotPasswordPage;