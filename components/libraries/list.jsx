import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from 'next-intl';

// 3rd party libraries
import { Card } from 'antd';
import { ImLibrary } from 'react-icons/im';

// Internal Imports
import libraryService from "@/services/libraryService";
import ApiContainer from "../common/ApiContainer";

// ------------------------------------------------------

const gridStyle = {
    width: '25%',
    textAlign: 'center',
    cursor: 'pointer'
  };

function LibrariesList () {
    const t = useTranslations();
    const router = useRouter();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [libraries, setLibraries] = useState(null);

    const loadLibraries = () => {
        setBusy(true);
        setError(false);

        libraryService.getLibraries()
            .then(res => setLibraries(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadLibraries(), [])

    return (<ApiContainer title={t('libraries.title')} busy={busy} error={error} empty={libraries && libraries.data && libraries.data.length < 1}>
        { libraries && libraries.data && libraries.data.map(l => (
            <Card.Grid style={gridStyle} key={l.id} hoverable onClick={() => router.push(`/libraries/${l.id}`)}>
                <Card.Meta
                    avatar={<ImLibrary />}
                    title={l.name}
                    description={l.description}
                />
            </Card.Grid>
        ))}
    </ApiContainer>)
}

export default LibrariesList;