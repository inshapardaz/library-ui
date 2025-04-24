import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// UI Library imports
import { ActionIcon, rem } from "@mantine/core";
import { spotlight, Spotlight } from "@mantine/spotlight";

// Local imports
import { IconSearch, } from "@/components/icon";
import BooksSearchSection from './booksSearchSection';
import AuthorsSearchSection from './authorsSearchSection';
import WritingsSearchSection from './writingsSearchSection';
import PoetriesSearchSection from './poetriesSearchSection';
import SeriesSearchSection from './seriesSearchSection';
import PeriodicalsSearchSection from './periodicalsSearchSection';

//-----------------------------
const SearchBox = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { libraryId } = useParams();
    const [query, setQuery] = useState('');
    return (<>
        <Spotlight.Root query={query} onQueryChange={setQuery}
            shortcut={['mod + K', 'mod + P', '/']} onSpotlightClose={() => setQuery('')}>
            <Spotlight.Search placeholder={t('search.placeholder')}
                leftSection={<IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />} />
            <Spotlight.ActionsList>
                <BooksSearchSection t={t} navigate={navigate} libraryId={libraryId} query={query} />
                <AuthorsSearchSection t={t} navigate={navigate} libraryId={libraryId} query={query} />
                <WritingsSearchSection t={t} navigate={navigate} libraryId={libraryId} query={query} />
                <PoetriesSearchSection t={t} navigate={navigate} libraryId={libraryId} query={query} />
                <SeriesSearchSection t={t} navigate={navigate} libraryId={libraryId} query={query} />
                <PeriodicalsSearchSection t={t} navigate={navigate} libraryId={libraryId} query={query} />
            </Spotlight.ActionsList>
        </Spotlight.Root>
        <ActionIcon onClick={spotlight.open}
            variant="default"
            size="xl"
            aria-label="search"
        >
            <IconSearch size={16} stroke={1.5} />
        </ActionIcon>
    </>)
};

export default SearchBox;
