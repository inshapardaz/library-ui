import { useTranslation } from 'next-i18next'

function LoginPage() {
  const { t } = useTranslation('common')

    return <h1>{t('login')}</h1>;
}

export default LoginPage;