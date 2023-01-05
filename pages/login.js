import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { Formik } from "formik";
import { Button, Card, Grid, Header, Image, Loader } from 'semantic-ui-react'
import {
  Form,
  Input,
  ResetButton,
  SubmitButton
} from "formik-semantic-ui-react";

import { signIn } from 'next-auth/react';
import useAuth from '../hooks/useAuth';
function LoginPage() {
  const { t } = useTranslation('common')
  const router = useRouter();
  const isAuthenticated = useAuth(false);

  if (isAuthenticated)  router.push('/')

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('login.message.email.error'))
      .required(t('login.message.email.required')),
    password: Yup.string()
      .required(t('login.message.password.required')),
  });

  const onSubmit = ({ email, password }, { setSubmitting }) => {
    signIn('credentials', { callbackUrl: '/' , email, password })
      .catch(() => toast.error(t('login.message.error')))
      .finally(() => setSubmitting(false));
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
          <Image alt={t('app')} src='/images/logo.png' /> {t('app')}
        </Header>
        <Card className='attached fluid segment'>
          <Card.Content>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form size="large">
                  <Loader active={isSubmitting}/>
                  <Input
                    id="email"
                    name="email"
                    icon="at"
                    placeholder={t('login.email.title')}
                    focus
                    fluid
                    errorPrompt
                  />
                  <Input
                    id="password"
                    name="password"
                    icon="key"
                    type="password"
                    placeholder={t('login.password.title')}
                    autoComplete="on"
                    focus
                    fluid
                    errorPrompt
                  />
                  <SubmitButton fluid primary>
                    {t('login')}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} href='/register'>{t('register')}</Button>
            <Button as={Link} href='/forgot-password'>{t('forgot.password')}</Button>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>);
}


export const getStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

export default LoginPage;