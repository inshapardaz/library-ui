import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// UI library imports
import { Button, Tooltip } from '@mantine/core';
import { IconAdd, IconTitle, IconDateCreated } from '@/components/icon';

// Local imports
import { useGetBookShelvesQuery } from "@/store/slices/bookShelves.api";

import { updateLinkToBookShelvesPage } from '@/utils';
import DataView from '@/components/dataView';
import SortMenu from '@/components/sortMenu';
import SortDirectionToggle from '@/components/sortDirectionToggle';

import BookShelfListItem from './bookShelfListItem';
import BookShelfCard from './bookShelfCard';
import BookShelfEditForm from './bookShelfEditForm';
//------------------------------

const BookShelvesList = ({
    libraryId,
    query = null,
    sortBy = null,
    sortDirection = null,
    status,
    pageNumber,
    pageSize,
    showSearch = true,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        refetch,
        data: bookShelves,
        isError,
        isFetching,
    } = useGetBookShelvesQuery({
        libraryId,
        query,
        sortBy,
        sortDirection,
        status,
        pageNumber,
        pageSize,
    });

    console.log("bookShelves", bookShelves);

    let bookShelvesSortOptions = [{
        label: t('bookShelves.name'),
        value: 'name',
        icon: <IconTitle />
    }, {
        label: t('bookShelves.noOfBooks'),
        value: 'bookCount',
        icon: <IconDateCreated />
    }];

    return <DataView
        emptyText={t('bookShelves.empty')}
        dataSource={bookShelves}
        isFetching={isFetching}
        isError={isError}
        errorTitle={t('bookShelves.error.loading.title')}
        errorDetail={t('bookShelves.error.loading.detail')}
        showViewToggle={true}
        viewToggleKey='book-shelves-list-view'
        cardRender={bookShelf => (<BookShelfCard libraryId={libraryId} key={bookShelf.id} bookShelf={bookShelf} />)}
        listItemRender={bookShelf => (<BookShelfListItem libraryId={libraryId} key={bookShelf.id} bookShelf={bookShelf} />)}
        onReload={refetch}
        onPageChanged={(index) => navigate(updateLinkToBookShelvesPage(location, {
            pageNumber: index,
            pageSize: pageSize,
        }))}
        showSearch={showSearch}
        searchValue={query}
        onSearchChanged={search => navigate(updateLinkToBookShelvesPage(location, {
            pageNumber: 1,
            query: search,
        }))}
        actions={<BookShelfEditForm libraryId={libraryId}  >
            <Tooltip label={t('bookShelf.actions.add.title')}>
                <Button variant='default'>
                    <IconAdd />
                </Button>
            </Tooltip>
        </BookShelfEditForm>}
        extraFilters={
            <>
                <SortMenu options={bookShelvesSortOptions} value={sortBy} onChange={value => navigate(updateLinkToBookShelvesPage(location, {
                    pageNumber: 1,
                    sortBy: value,
                }))} />
                <SortDirectionToggle value={sortDirection} onChange={dir => navigate(updateLinkToBookShelvesPage(location, {
                    pageNumber: 1,
                    sortDirection: dir,
                }))} />
            </>
        }
        cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4, xl: 6 }}
    />;
}

BookShelvesList.propTypes = {

    libraryId: PropTypes.string,
    query: PropTypes.string,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    status: PropTypes.string,
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    showSearch: PropTypes.bool,
}

export default BookShelvesList;