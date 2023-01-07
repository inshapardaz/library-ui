import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';

// 3rd party libraries
import { toast } from 'react-toastify';
import { Card, Grid, Header, Image, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { Formik } from "formik";
import {
  Form,
  Input,
  SubmitButton
} from "formik-semantic-ui-react";

// Internal imports
import accountService  from '@/services/accountService';

function ChangePasswordPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required(t('changePassword.message.oldPassword.required')),
    password: Yup.string()
      .min(6, t('changePassword.message.password.error.length'))
      .required(t('changePassword.message.password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('changePassword.message.confirmPassword.error.match' ))
      .required(t('changePassword.message.confirmPassword.required')),
  });

  const onSubmit = ({ oldPassword, password }, { setSubmitting }) => {
    accountService.changePassword(oldPassword, password )
      .then(() => toast.success(t('changePassword.message.success')))
      .then(() => router.push('/'))
      .catch(() => toast.error(t('changePassword.message.error')))
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
                    id="old-password"
                    name="oldPassword"
                    icon="key"
                    type="password"
                    placeholder={t('changePassword.oldPassword.label')}
                    autoComplete="on"
                    focus
                    fluid
                    errorPrompt
                  />
                  <Input
                    id="new-password"
                    name="password"
                    icon="key"
                    type="password"
                    placeholder={t('changePassword.password.label')}
                    autoComplete="on"
                    focus
                    fluid
                    errorPrompt
                  />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    icon="key"
                    type="password"
                    placeholder={t('changePassword.confirmPassword.label')}
                    autoComplete="on"
                    fluid
                    errorPrompt
                  />
                  <SubmitButton fluid primary>
                    {t('changePassword.submit')}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
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

export default ChangePasswordPage;