import Head from 'next/head'
import { useTranslations } from 'next-intl';

// 3rd part imports
import { Button, Typography } from 'antd'
import { GiRead } from 'react-icons/gi'

// Local Imports
import styles from '../styles/common.module.scss'
import HeroImage from '@/components/heroImage'
import LibrariesList from '@/components/libraries/list'

// -------------------------------------------

function HomePage() {
  const t = useTranslations()
  return (
    <>
      <Head>
        <title>{t('app')}</title>
      </Head>
      <HeroImage>
        <Typography.Title level={1} className={styles.hero__title} >{t('app')}</Typography.Title>
        <div className={styles.hero__content}>
            <p>{t('home.welcome')}</p>
            <Button type="primary" icon={<GiRead />}> {t('home.gettingStarted')}</Button>
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
    messages: (await import(`../i18n/${locale}.json`)).default
  },
})

export default HomePage;