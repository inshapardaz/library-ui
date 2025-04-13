import PropTypes from 'prop-types';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// UI library imports
import {
    Button,
    Card,
    Container,
    useMantineTheme
} from '@mantine/core';

// Local imports
import { SortDirection } from "@/models";
import { useGetBookShelfByIdQuery } from '@/store/slices/bookShelves.api';
import { IconNames, IconBooks, IconAdd, IconEdit } from '@/components/icon';
import BooksList from "@/components/books/booksList";
import IconText from "@/components/iconText";
import PageHeader, { PageHeaderSkeleton } from "@/components/pageHeader";
import If from "@/components/if";
import BookShelfEditForm from '@/components/bookShelves/bookShelfEditForm';
import BookShelfAddBook from '../../components/bookShelves/bookShelfAddBook';

//------------------------------------------------------

const BookShelvePage = () => {
    const { libraryId, bookShelfId } = useParams();
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const sortDirection = searchParams.get("sortDirection") ?? SortDirection.Ascending;
    const pageNumber = searchParams.get("pageNumber") ?? 1;
    const pageSize = searchParams.get("pageSize") ?? 12;

    const {
        data: bookShelf,
        error: errorLoadingBookShelf,
        isFetching: loadingBookshelf,
    } = useGetBookShelfByIdQuery({
        libraryId,
        bookShelfId
    });

    if (loadingBookshelf) {
        return (<Container my="md">
            <PageHeaderSkeleton />
        </Container>);
    }

    if (errorLoadingBookShelf) {
        return "Error";
    }

    return (<Container fluid mt='md'>
        <PageHeader title={bookShelf.name}
            defaultIcon={IconNames.BookShelf}
            subTitle={
                <If condition={bookShelf.bookCount > 0}>
                    <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('bookShelves.bookCount', { count: bookShelf.bookCount })} />
                </If>
            }
            details={bookShelf.description}
            breadcrumbs={[
                { title: t('header.home'), href: `/libraries/${libraryId}`, icon: IconNames.Home },
                { title: t('header.bookShelves'), href: `/libraries/${libraryId}/bookShelves`, icon: IconNames.BookShelf },
            ]}
            actions={[
                <BookShelfEditForm libraryId={libraryId} bookShelf={bookShelf} key="edit-book-shelf">
                    <Button variant="outline" color="dark" size="xs"
                        leftSection={<IconEdit height={16} style={{ color: theme.colors.dark[2] }} />}
                    >
                        {t('actions.edit')}
                    </Button>
                </BookShelfEditForm>,
                <BookShelfAddBook libraryId={libraryId} bookShelf={bookShelf} key="add-book">
                    <Button key="add-book" variant="outline" color="dark" size="xs"
                        leftSection={<IconAdd height={16} style={{ color: theme.colors.dark[2] }} />} >
                        {t('bookShelf.actions.addBook.title')}
                    </Button>
                </BookShelfAddBook>
            ]} />

        <Card withBorder>
            <BooksList
                libraryId={libraryId}
                bookShelf={bookShelf?.id}
                query={query}
                sortBy="seriesIndex"
                sortDirection={sortDirection}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showSearch
                showTitle={false} />
        </Card>
    </Container >);
}

BookShelvePage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
};

export default BookShelvePage;
