import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Internal Imports
import styles from '../../../styles/library.module.scss'
import SearchBox from '@/components/searchBox';
import LatestBooks from '@/components/books/latestBooks';
import libraryService from '@/services/libraryService';
// ------------------------------------------------------

const useStaticImage = false;

function LibraryHomePage() {
    const router = useRouter()
    const { libraryId } = router.query
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [library, setLibrary] = useState(null);

    const loadLibrary = () => {
        console.log('Loading library')
        setBusy(true);
        setError(false);

        libraryService.getLibrary(libraryId)
            .then(res => setLibrary(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadLibrary(), [])

    return <>
        <div className={styles.hero} style={{
          backgroundImage: (useStaticImage ? 'url(/images/home_background.jpg)' : 'url(https://source.unsplash.com/1600x900/?library,books)')
        }}
        data-ft="home-page"
      >
        <div className={styles.hero__background}
        >
            <h1 className={styles.hero__title}>{library ? library.name : ''}</h1>
            <div className={styles.hero__searchBox}>
              <SearchBox libraryId={libraryId}/>
            </div>
        </div>
      </div>
      <LatestBooks libraryId={libraryId}/>
    </>;
}


export default LibraryHomePage;