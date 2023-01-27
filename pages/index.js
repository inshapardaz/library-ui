import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// 3rd part imports
import { Button } from 'antd'
import { GiRead } from 'react-icons/gi'

// Local Imports
import styles from '../styles/common.module.scss'
import HeroImage from '@/components/heroImage'
import LibrariesList from '@/components/libraries/list'

// -------------------------------------------

function HomePage() {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('app')}</title>
      </Head>
      <HeroImage>
        <h1 className={styles.hero__title}>{t('app')}</h1>
        <div className={styles.hero__content}>
            <p>{t('welcome.message')}</p>
            <Button type="primary" icon={<GiRead />}> {t('welcome.message.button')}</Button>
        </div>
      </HeroImage>
      <LibrariesList />
    </>
  )
}

export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})

export default HomePage;