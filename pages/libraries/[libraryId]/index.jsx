import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// 3rd party library
import { Typography } from 'antd';

// Internal Imports
import styles from '@/styles/common.module.scss'
import SearchBox from '@/components/searchBox';
import LatestBooks from '@/components/books/latestBooks';
import libraryService from '@/services/libraryService';
import HeroImage from '@/components/heroImage';
// ------------------------------------------------------

function LibraryHomePage() {
    const router = useRouter()
    const { libraryId } = router.query
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [library, setLibrary] = useState(null);

    const loadLibrary = () => {
        setBusy(true);
        setError(false);

        libraryService.getLibrary(libraryId)
            .then(res => setLibrary(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadLibrary(), [])

    return (<>
      <HeroImage>
        <Typography.Title level={1} className={styles.hero__title} >{library ? library.name : ''}</Typography.Title>
        <div className={styles.hero__content}>
          <SearchBox libraryId={libraryId}/>
        </div>
      </HeroImage>
      <LatestBooks libraryId={libraryId}/>
    </>);
}


export const getServerSideProps = async ({
  locale,
}) => ({
  props: {
    messages: (await import(`@/i18n/${locale}.json`)).default
  },
})

export default LibraryHomePage;