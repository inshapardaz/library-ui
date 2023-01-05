import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutWithHeader from '../../../components/layout/layoutWithHeader'

function LibraryHomePage() {
    const router = useRouter()
    const { libraryId } = router.query
    return <>
        <LayoutWithHeader />
        <h1>Library {libraryId} Home Page</h1>
    </>;
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

export default LibraryHomePage;