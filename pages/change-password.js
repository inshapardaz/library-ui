import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// 3rd party libraries
import { App, Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

// Internal imports
import styles from '../styles/common.module.scss'
import accountService  from '@/services/accountService';
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

// -------------------------------------------------------------------

function ChangePasswordPage() {
  const { message } = App.useApp();
  const { t } = useTranslation()
  const router = useRouter()
  const [busy, setBusy] = useState(false);
  
  const onSubmit = ({ oldPassword, password }) => {
    setBusy(true);
    accountService.changePassword(oldPassword, password )
      .then(() => message.success(t('changePassword.message.success')))
      .then(() => router.push('/'))
      .catch(() => message.error(t('changePassword.message.error')))
      .finally(() => setBusy(false));
  };

  return (
    <FullPageFormContainer title={t('changePassword')}>
        <Form name="forgot-password" className={styles["login-form"]} onFinish={onSubmit}
        >
          <Form.Item name="oldPassword" hasFeedback
            rules={[
              {
                required: true,
                message: t('changePassword.message.oldPassword.required'),
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('changePassword.oldPassword.label')}
            />
          </Form.Item>
          <Form.Item name="password" hasFeedback
            rules={[
              {
                required: true,
                message: t('changePassword.message.password.required'),
              },
              {
                type: 'string',
                min: 6,
                message: t('changePassword.message.password.error.length'),              
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('changePassword.password.label')}
            />
          </Form.Item>
          <Form.Item name="confirmPassword" hasFeedback
            rules={[
              {
                required: true,
                message: t('changePassword.message.confirmPassword.required'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('changePassword.message.confirmPassword.error.match' )));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('register.confirmPassword.label')}
            />
          </Form.Item>

          <Form.Item>
            <Link className={styles["login-form-forgot"]} href="/login">
              {t('login')}
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              {t('changePassword.submit')}
            </Button>
            Or <Link href="/">{t('home')}</Link>
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

ChangePasswordPage.Layout = LayoutWithFooter;
export default ChangePasswordPage;