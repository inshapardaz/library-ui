import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

// 3rd party libraries
import { App, Button, Form, Input, Space, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Internal imports
import styles from '../styles/common.module.scss'
//import accountService from '@/services/accountService';
import FullPageFormContainer from '../components/layout/fullPageFormContainer';


function ForgotPassword() {
  const { message } = App.useApp();
  const { t } = useTranslation()
  const navigate = useNavigate();
  
  const [busy, setBusy] = useState(false);
  
  const onSubmit = ({ email }, { setSubmitting }) => {
    // setBusy(true);
    // accountService.forgotPassword(email)
    //   .then(() => message.success(t('forgotPassword.success')))
    //   .then(() => navigate('/'))
    //   .catch(() => message.error(t('forgotPassword.error')))
    //   .finally(() => setBusy(false));
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

export default ForgotPassword;