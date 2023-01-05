import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';

import { toast } from 'react-toastify';
import queryString from 'query-string';

import { Button, Card, Grid, Header, Image, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { Formik } from "formik";
import {
  Form,
  Input,
  Checkbox,
  SubmitButton
} from "formik-semantic-ui-react";

import accountService  from '../services/accountService';
import EmptyLayout from '../components/layout/emptyLayout';

function LinkText({ href, children }) {
  return <Link to={href || ''}>{children}</Link>;
}
function RegisterPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  
  const initialValues = {
    name: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('register.message.name.required' )),
    password: Yup.string()
      .min(6, t('register.message.password.error.length' ))
      .required(t('register.message.password.required' )),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('register.message.confirmPassword.error.match' ))
      .required(t('register.message.confirmPassword.required' )),
    acceptTerms: Yup.boolean()
    .required( t('register.message.acceptTerms.requires'))
    .oneOf([true],  t('register.message.acceptTerms.requires')),
  });

  useEffect(() => {
    const { code } = queryString.parse(router.query);
    if (code) {
      accountService.verifyInvite(code)
        .then(() => setBusy(false))
        .catch((e) => {
          setBusy(false);
          if (e.status === 410) {
            toast.error(t('invitation.message.expired'));
            router.push('/');
          } else if (e.status === 404) {
            toast.error(t('invitation.message.notFound'));
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
      .then(() => toast.success(t('register.message.success')))
      .then(() => router.push('/'))
      .catch(() => toast.error(t('register.message.error')))
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
                  <Loader active={isSubmitting} />
                  <Input
                    id="name"
                    name="name"
                    icon="user"
                    placeholder={t('register.name.label')}
                    focus
                    fluid
                    errorPrompt
                  />
                  <Input
                    id="password"
                    name="password"
                    icon="key"
                    type="password"
                    placeholder={t('register.password.label')}
                    autoComplete="on"
                    fluid
                    errorPrompt
                  />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    icon="key"
                    type="password"
                    placeholder={t('register.confirmPassword.label')}
                    autoComplete="on"
                    fluid
                    errorPrompt
                  />
                  <Checkbox
                    id="checkbox-acceptTerms"
                    fitted
                    name="acceptTerms"
                    label={
                      <label>
                        {t('register.acceptTerms.title')}
                        {/* <Trans i18nKey="register.acceptTerms.title" t={t} components={[<LinkText href="/terms-and-conditions" key="terms" />]} /> */}
                      </label>
                    }
                  />
                  <SubmitButton fluid primary>
                    {t('forgotPassword.submit')}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} href='/'>{t('header.home')}</Button>
            <Button as={Link} href='/login'>{t('login')}</Button>
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

RegisterPage.Layout = EmptyLayout;
export default RegisterPage;