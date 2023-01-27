import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next'
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// 3rd party libraries
import queryString from 'query-string';
import { App, Button, Form, Input, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import styles from '../styles/common.module.scss'
import accountService from '@/services/accountService';
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

function LinkText({ href, children }) {
  return <Link to={href || ''}>{children}</Link>;
}
function RegisterPage() {
  const { message } = App.useApp();
  const { t } = useTranslation()
  const router = useRouter()
  const [busy, setBusy] = useState(false);
  
  useEffect(() => {
    const { code } = queryString.parse(router.query);
    if (code) {
      accountService.verifyInvite(code)
        .then(() => setBusy(false))
        .catch((e) => {
          setBusy(false);
          if (e.status === 410) {
            message.error(t('invitation.message.expired'));
            router.push('/');
          } else if (e.status === 404) {
            message.error(t('invitation.message.notFound'));
            router.push('/');
          } else {
            router.push('/500');
          }
        });
    } else {
      router.push('/');
    }
  }, []);

  const onSubmit = (fields, { setSubmitting }) => {
    const { code } = queryString.parse(router.query);

    accountService.register(code, fields)
      .then(() => message.success(t('register.message.success')))
      .then(() => router.push('/'))
      .catch(() => message.error(t('register.message.error')))
      .finally(() => setSubmitting(false));
  };

  return (
    <FullPageFormContainer title={t('forgotPassword.title')}>
        <Form name="forgot-password" className={styles["login-form"]} onFinish={onSubmit}
        >
          <Form.Item name="name" hasFeedback
            rules={[
              {
                required: true,
                message: t('register.message.name.required'),
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('register.name.label')} />
          </Form.Item>
          <Form.Item name="password" hasFeedback
            rules={[
              {
                required: true,
                message: t('register.message.password.required'),
              },
              {
                type: 'string',
                min: 6,
                message: t('register.message.password.error.length'),              
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('register.password.label')}
            />
          </Form.Item>
          <Form.Item name="confirmPassword" hasFeedback
            rules={[
              {
                required: true,
                message: t('register.message.confirmPassword.required'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('register.message.confirmPassword.error.match' )));
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
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error(t('register.message.acceptTerms.requires'))),
              },
            ]}
          >
            <Checkbox>
              {t('register.acceptTerms.title')}
            </Checkbox>
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
            Or <Link href="/">{t('header.home')}</Link>
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

RegisterPage.Layout = LayoutWithFooter;
export default RegisterPage;