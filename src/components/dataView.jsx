import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { useLocalStorage } from '@mantine/hooks';
import {
    Button,
    Center,
    Divider,
    Group,
    Pagination,
    Paper,
    SimpleGrid,
    Skeleton,
    Stack,
    Table,
    Text,
    Title
} from "@mantine/core";

// Local imports
import { IconRefreshAlert, IllustrationError } from '@/components/icon'
import LayoutToggle from '@/components/layoutToggle';
//------------------------------

const DataView = ({
    title,
    emptyText,
    dataSource = null,
    isFetching = false,
    isError = false,
    showViewToggle = true,
    viewToggleKey,
    cardRender = () => null,
    listItemRender = () => null,
    onReload = () => { },
    onPageChanged = () => { }
}) => {
    const { t } = useTranslation();
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
                <Table verticalSpacing="sm">
                    <Table.Tbody>
                        {Array(12).fill(1).map((_, index) => <Skeleton key={index} height={75} m={4} />)}
                    </Table.Tbody>
                </Table>)
        }
        // } else if (true) {
    } else if (isError) {
        content = (
            <Center h={500}>
                <Stack>
                    <IllustrationError />
                    <Button rightSection={<IconRefreshAlert />} variant='light' onClick={onReload}>{t('actions.retry')}</Button>
                </Stack>
            </Center>)
    } else if (dataSource && dataSource.data.length > 0) {
        if (viewType == 'card') {
            content = (<Stack>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={{ base: 10, sm: 'xl' }}
                    verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                    {dataSource.data.map(item => cardRender(item))}
                </SimpleGrid>
                <Center>
                    {pageination}
                </Center>
            </Stack>);
        } else {
            content = (
                <Stack>
                    <Table verticalSpacing="sm" highlightOnHover>
                        <Table.Tbody>
                            {dataSource.data.map(item => listItemRender(item))}
                        </Table.Tbody>
                    </Table>
                    <Center>
                        {pageination}
                    </Center>
                </Stack>)
        }
    } else {
        content = (<Center h={100}><Text>{emptyText}</Text></Center>)
    }
    return (<Paper p="xl" m="xl" withBorder>
        <Stack>
            <Group justify="space-between">
                <Title order={3}>{title}</Title>
                {showViewToggle && <LayoutToggle value={viewType} onChange={toggleViewType} />}
            </Group>
            <Divider />
            {content}
            <Divider my="md" />
        </Stack>
    </Paper>)
}

DataView.propTypes = {
    title: PropTypes.string,
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
    showViewToggle: PropTypes.bool,
    viewToggleKey: PropTypes.string,
    cardRender: PropTypes.func,
    listItemRender: PropTypes.func,
    onReload: PropTypes.func,
    onPageChanged: PropTypes.func
}

export default DataView;