import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 3rd party libraries
import { App, Button, Form, Input, Space, Divider } from 'antd';
import { LockOutlined } from '@ant-design/icons';

// Internal imports
import accountService  from '@/services/accountService';
import LayoutWithFooter from '@/components/layout/layoutWithFooter';
import FullPageFormContainer from '@/components/layout/fullPageFormContainer';

// -------------------------------------------------------------------

function ChangePasswordPage() {
  const { message } = App.useApp();
  const t = useTranslations()
  const router = useRouter()
  const [busy, setBusy] = useState(false);
  
  const onSubmit = ({ oldPassword, password }) => {
    setBusy(true);
    accountService.changePassword(oldPassword, password )
      .then(() => message.success(t('changePassword.success')))
      .then(() => router.push('/'))
      .catch(() => message.error(t('changePassword.error')))
      .finally(() => setBusy(false));
  };

  return (
    <FullPageFormContainer title={t('changePassword')}>
        <Form name="forgot-password" onFinish={onSubmit}
        >
          <Form.Item name="oldPassword" hasFeedback
            rules={[
              {
                required: true,
                message: t('changePassword.oldPassword.required'),
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
                message: t('changePassword.password.required'),
              },
              {
                type: 'string',
                min: 6,
                message: t('changePassword.password.length'),              
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
                message: t('changePassword.confirmPassword.required'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('changePassword.confirmPassword.match' )));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('changePassword.confirmPassword.label')}
            />
          </Form.Item>

          <Form.Item>
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" block>
                {t('changePassword.submit')}
              </Button>
              <Divider />
              <Button href="/login" type="text" block>
                {t('login.title')}
              </Button>
              <Button href="/" type="text" block>{t('header.home')}</Button>
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
    messages: (await import(`@/i18n/${locale}.json`)).default
  },
})

ChangePasswordPage.Layout = LayoutWithFooter;
export default ChangePasswordPage;