import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from 'next-intl';

// 3rd party libraries
import { Button, List } from 'antd';
import { ImLibrary } from 'react-icons/im';

// Internal Imports
import libraryService from "@/services/libraryService";
import ApiContainer from "../common/ApiContainer";

// ------------------------------------------------------


function ShowMoreButton ({ t }) {
    const router = useRouter();
    return(<div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button size="small" onClick={() => router.push(`/libraries`)}>
            {t('actions.seeMore')}
        </Button>
    </div>);
}

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

    return (<ApiContainer 
        busy={busy} 
        error={error} 
        empty={libraries && libraries.data && libraries.data.length < 1}>
        <List
            loading={busy}
            size="large"
            itemLayout="vertical"
            dataSource={libraries ? libraries.data : []}
            loadMore={<ShowMoreButton t={t} />}
            renderItem={(l) => (
                <List.Item key={l.id} onClick={() => router.push(`/libraries/${l.id}`)} style={{ cursor : 'pointer'}}>
                    <List.Item.Meta
                        avatar={<ImLibrary />}
                        title={l.name}
                    />
                </List.Item>
            )}
        />
    </ApiContainer>);
}

export default LibrariesList;