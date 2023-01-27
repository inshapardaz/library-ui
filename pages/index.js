import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useTranslation } from 'react-i18next'

// Styles
import styles from '../styles/common.module.scss'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// -------------------------------------------

const inter = Inter({ subsets: ['latin'] })

function HomePage() {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('app')}</title>
      </Head>
        <Link
          href="/libraries"
          className={styles.card}
        >
          <h2 className={inter.className}>
            {t('libraries.header')} <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Browse all public libraries
          </p>
        </Link>
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