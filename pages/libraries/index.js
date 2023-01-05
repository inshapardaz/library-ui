import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function LibrariesHomePage() {
    return <>
        <h1>Libraries Home Page</h1>
    </>;
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
  
export default LibrariesHomePage;