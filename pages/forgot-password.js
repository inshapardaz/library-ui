import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function LoginPage() {
  const { t } = useTranslation('common')

    return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
          <Image alt={t('app')} src='/images/logo.png' /> {t('app')}
        </Header>
        <Form size='large' className='attached fluid segment'>
            <Form.Input fluid icon='user' iconPosition='left' placeholder={t('forgotPassword.email.title')} />

            <Button fluid size='large' primary>
              {t('forgotPassword.submit')}
            </Button>
        </Form>
        <Button.Group attached='bottom'>
          <Button as={Link} href='/register'>{t('register')}</Button>
          <Button as={Link} href='/login'>{t('login')}</Button>
        </Button.Group>
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