import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// 3rd party libraries
import queryString from 'query-string';
import { App, Button, Form, Input, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import styles from '../styles/common.module.scss'
import accountService from '@/services/accountService';
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

// ------------------------------------------------------

function RegisterPage() {
  const { message } = App.useApp();
  const t = useTranslations()
  const router = useRouter()
  const [busy, setBusy] = useState(false);
  
  // useEffect(() => {
  //   const { code } = queryString.parse(router.query);
  //   if (code) {
  //     accountService.verifyInvite(code)
  //       .then(() => setBusy(false))
  //       .catch((e) => {
  //         setBusy(false);
  //         if (e.status === 410) {
  //           message.error(t('register.invitation.expired'));
  //           router.push('/');
  //         } else if (e.status === 404) {
  //           message.error(t('register.invitation.notFound'));
  //           router.push('/');
  //         } else {
  //           router.push('/500');
  //         }
  //       });
  //   } else {
  //     router.push('/');
  //   }
  // }, []);

  const onSubmit = (fields, { setSubmitting }) => {
    const { code } = queryString.parse(router.query);

    accountService.register(code, fields)
      .then(() => message.success(t('register.success')))
      .then(() => router.push('/'))
      .catch(() => message.error(t('register.error')))
      .finally(() => setSubmitting(false));
  };

  return (
    <FullPageFormContainer title={t('register.title')}>
        <Form name="register" className={styles["login-form"]} onFinish={onSubmit}
        >
          <Form.Item name="name" hasFeedback
            rules={[
              {
                required: true,
                message: t('register.name.required'),
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('register.name.label')} />
          </Form.Item>
          <Form.Item name="password" hasFeedback
            rules={[
              {
                required: true,
                message: t('register.password.required'),
              },
              {
                type: 'string',
                min: 6,
                message: t('register.password.length'),              
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
                message: t('register.confirmPassword.required'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('register.confirmPassword.match' )));
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
                  value ? Promise.resolve() : Promise.reject(new Error(t('register.acceptTerms.requires'))),
              },
            ]}
          >
            <Checkbox>
              {t('register.acceptTerms.title')}
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Link className={styles["login-form-forgot"]} href="/login">
              {t('login.title')}
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              {t('register.submit')}
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
    messages: (await import(`../i18n/${locale ?? 'en'}.json`)).default
  },
})

RegisterPage.Layout = LayoutWithFooter;
export default RegisterPage;