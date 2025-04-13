import PropTypes from 'prop-types';

// Ui Library Imports
import { useLocalStorage } from '@mantine/hooks';
import {
    Center,
    Divider,
    Grid,
    Group,
    Pagination,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Title
} from "@mantine/core";

// Local imports
import LayoutToggle from '@/components/layoutToggle';
import Error from './error';
import If from '@/components/if';
import SearchInput from '@/components/searchInput';

//------------------------------

const DataView = ({
    title,
    actions = null,
    emptyText,
    dataSource = null,
    isFetching = false,
    isError = false,
    errorTitle = '',
    errorDetail = '',
    showViewToggle = true,
    viewToggleKey,
    showSearch,
    searchValue,
    showPagination = true,
    extraFilters = null,
    onSearchChanged = () => { },
    cardRender = () => null,
    listItemRender = () => null,
    onReload = () => { },
    onPageChanged = () => { },
    cols = { base: 1, sm: 2, md: 3, lg: 4 },
    spacing = { base: 10, sm: 'xl' },
    verticalSpacing = { base: 'md', sm: 'xl' }
}) => {
    const [viewType, setViewType] = useLocalStorage({
        key: viewToggleKey,
        defaultValue: 'card',
    });

    const toggleViewType = () =>
        setViewType((current) =>
            current === 'card' ? 'list' : 'card'
        );

    let content = null;
    const pageination = (<Pagination siblings={2}
        total={dataSource?.pageCount}
        defaultValue={dataSource?.currentPageIndex}
        onChange={onPageChanged}
        withControls
        withEdges
        hideWithOnePage
    />)

    if (isFetching) {
        if (viewType == 'card') {
            content = (
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={{ base: 10, sm: 'xl' }}
                    verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                    {Array(12).fill(1).map((_, index) => <Skeleton key={index} height={327} />)}
                </SimpleGrid>)
        } else {
            content = (
                <Stack align="stretch"
                    justify="center"
                    gap="md">
                    {Array(12).fill(1).map((_, index) => <Skeleton key={index} height={75} m={4} />)}
                </Stack>)
        }
    } else if (isError) {
        content = (
            <Error title={errorTitle}
                detail={errorDetail}
                onRetry={onReload} />)
    } else if (dataSource && dataSource.data.length > 0) {
        if (viewType == 'card') {
            content = (<Stack>
                <SimpleGrid
                    cols={cols}
                    spacing={spacing}
                    verticalSpacing={verticalSpacing}
                >
                    {dataSource.data.map(item => cardRender(item))}
                </SimpleGrid>
                <If condition={showPagination}>
                    <Center>
                        {pageination}
                    </Center>
                </If>
            </Stack>);
        } else {
            content = (
                <Stack>
                    <Stack align="stretch"
                        justify="center"
                        gap="md">
                        {dataSource.data.map(item => listItemRender(item))}
                    </Stack>
                    <If condition={showPagination}>
                        <Center>
                            {pageination}
                        </Center>
                    </If>
                </Stack>)
        }
    } else {
        content = (<Center h={100}><Text>{emptyText}</Text></Center>)
    }
    return (<>
        <Grid>
            <Grid.Col span="auto">
                <Title order={3}>{title}</Title>
                <If condition={actions}>
                    {actions}
                </If>
            </Grid.Col>
            <Grid.Col span="auto"></Grid.Col>
            <Grid.Col span="contents" visibleFrom="sm">
                <Group justify="space-between">
                    <If condition={showSearch}>
                        <SearchInput query={searchValue} onQueryChanged={onSearchChanged} />
                    </If>
                    <If condition={extraFilters}>
                        {extraFilters}
                    </If>
                    <If condition={showViewToggle}>
                        <LayoutToggle value={viewType} onChange={toggleViewType} />
                    </If>
                </Group>
            </Grid.Col>
            <Grid.Col hiddenFrom="sm">
                <Group justify="space-between">
                    <If condition={showSearch}>
                        <SearchInput query={searchValue} onQueryChanged={onSearchChanged} />
                    </If>
                    <If condition={extraFilters}>
                        {extraFilters}
                    </If>
                    <If condition={showViewToggle}>
                        <LayoutToggle value={viewType} onChange={toggleViewType} />
                    </If>
                </Group>
            </Grid.Col>
        </Grid>
        <Divider my="sm" />
        {content}
    </>)
}

DataView.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.any,
    emptyText: PropTypes.string,
    dataSource: PropTypes.shape({
        pageSize: PropTypes.number,
        pageCount: PropTypes.number,
        currentPageIndex: PropTypes.number,
        totalCount: PropTypes.number,
        data: PropTypes.array,
    }),
    isFetching: PropTypes.bool,
    isError: PropTypes.bool,
    errorTitle: PropTypes.string,
    errorDetail: PropTypes.string,
    showViewToggle: PropTypes.bool,
    viewToggleKey: PropTypes.string,
    extraFilters: PropTypes.any,
    showSearch: PropTypes.bool,
    searchValue: PropTypes.string,
    showPagination: PropTypes.bool,
    onSearchChanged: PropTypes.func,
    cardRender: PropTypes.func,
    listItemRender: PropTypes.func,
    onReload: PropTypes.func,
    onPageChanged: PropTypes.func,
    cols: PropTypes.any,
    spacing: PropTypes.any,
    verticalSpacing: PropTypes.any
}

export default DataView;