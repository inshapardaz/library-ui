import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import { useRouter } from 'next/router';

// 3rd party libraries
import { toast } from 'react-toastify';
import { Button, Card, Grid, Header, Image, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { Formik } from "formik";
import {
  Form,
  Input,
  SubmitButton
} from "formik-semantic-ui-react";

// Internal imports
import accountService  from '@/services/accountService';
import EmptyLayout from '@/components/layout/emptyLayout';

function ForgotPasswordPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('login.message.email.error'))
      .required(t('login.message.email.required'))
  });

  const onSubmit = ({ email }, { setSubmitting }) => {
    accountService.forgotPassword(email)
      .then(() => toast.success(t('forgotPassword.message.success')))
      .then(() => router.push('/'))
      .catch(() => toast.error(t('forgotPassword.message.error')))
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
                    id="input-email"
                    name="email"
                    icon="at"
                    placeholder={t('forgotPassword.email.title')}
                    focus
                    fluid
                    errorPrompt
                  />
                  <SubmitButton fluid primary>
                    {t('forgotPassword.submit')}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} href='/register'>{t('register')}</Button>
            <Button as={Link} href='/login'>{t('login')}</Button>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>);
}


export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

ForgotPasswordPage.Layout = EmptyLayout;
export default ForgotPasswordPage;