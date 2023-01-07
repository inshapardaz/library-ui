import { useEffect, useState } from "react";

// 3rd party libraries
import { Grid, Segment,  Button, Header, Icon } from 'semantic-ui-react'

// Internal Imports
import libraryService from "@/services/libraryService";
import LibraryCard from "./libraryCard";
import { useTranslation } from "react-i18next";

function LibrariesList () {
    const { t } = useTranslation();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(false);
    const [libraries, setLibraries] = useState([]);

    const loadLibraries = () => {
        console.log('Loading libraries')
        setBusy(true);
        setError(false);

        libraryService.getLibraries()
            .then(res => setLibraries(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }

    useEffect(() => loadLibraries(), [])

    if (busy) {
        return (
        <Grid container columns={3}>
        { [1,2,3].map(l => (
            <Grid.Column key={l} mobile={16} tablet={8} computer={4}>
                <LibraryCard loading />
            </Grid.Column>
            ))}
        </Grid>
      );
    }

    if (error) {
        return (<Segment placeholder>
            <Header icon>
            <Icon name='warning sign' />
                {t('libraries.message.loading.error')}
            </Header>
            <Button primary onClick={loadLibraries}>{t('action.retry')}</Button>
        </Segment>
        )
    }

    if (!busy && libraries && libraries.length < 1) {
        <Segment placeholder>
            <Header icon>
            <Icon name='inbox' />
                {t('libraries.message.empty')}
            </Header>
            <Button primary onClick={loadLibraries}>{t('library.createNew')}</Button>
        </Segment>
    }

    return ( <Grid container columns={3}>
        { libraries.map(l => (
        <Grid.Column key={l.id} mobile={16} tablet={8} computer={4}>
          <LibraryCard library={l} />
        </Grid.Column>
        ))}
        
      </Grid>)
}

export default LibrariesList;