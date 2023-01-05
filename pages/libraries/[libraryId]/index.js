import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function LibraryHomePage() {
    const router = useRouter()
    const { libraryId } = router.query
    return <>
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