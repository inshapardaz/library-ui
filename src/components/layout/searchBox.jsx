// UI Libray imports
import { ActionIcon, rem } from "@mantine/core";

// Local imports
import { IconBooks, IconSearch } from "../icon";
import { Spotlight, spotlight } from "@mantine/spotlight";

const actions = [
    {
        id: 'home',
        label: 'Home',
        description: 'Get to home page',
        onClick: () => console.log('Home'),
        leftSection: <IconBooks style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Get full information about current system status',
        onClick: () => console.log('Dashboard'),
        leftSection: <IconBooks style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
        id: 'documentation',
        label: 'Documentation',
        description: 'Visit documentation to lean more about all features',
        onClick: () => console.log('Documentation'),
        leftSection: <IconBooks style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
];

//-----------------------------
const SearchBox = () => {
    return (<>
        <Spotlight
            actions={actions}
            nothingFound="Nothing found..."
            highlightQuery
            searchProps={{
                leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
                placeholder: 'Search...',
            }}
        />
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