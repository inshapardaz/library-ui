import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

// Ui Library imports
import { Button, Center, Group, Loader, SegmentedControl, SimpleGrid, Stack, Text, Title } from '@mantine/core';

// Local imports
import { SortDirection } from '@/models';
import { useGetBooksQuery } from '@/store/slices/books.api';
import { useGetArticlesQuery } from '@/store/slices/articles.api';
import BookCard from '@/components/books/bookCard';
import WritingCard from '@/components/writings/writingCard';
import PoetryCard from '@/components/poetry/poetryCard';
import BooksList from '@/components/books/booksList';
import WritingsList from '@/components/writings/writingsList';
import PoetryList from '@/components/poetry/poetryList';

//------------------------------

const TYPES = ['all', 'books', 'poetry', 'writings'];
const PREVIEW_SIZE = 6;

const Preview = ({ title, onViewAll, result, render }) => {
    const { t } = useTranslation();
    const items = result.data?.data ?? [];

    if (!result.isFetching && items.length === 0) {
        return null;
    }

    return (
        <Stack gap="xs">
            <Group justify="space-between">
                <Title order={4}>{title}</Title>
                <Button variant="subtle" size="compact-sm" onClick={onViewAll}>{t('actions.viewAll')}</Button>
            </Group>
            {result.isFetching
                ? <Center h={100}><Loader size={30} /></Center>
                : <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>{items.map(render)}</SimpleGrid>}
        </Stack>
    );
};

Preview.propTypes = {
    title: PropTypes.string,
    onViewAll: PropTypes.func,
    result: PropTypes.object,
    render: PropTypes.func,
};

// Books, poetry and writings the user has favorited (mode "favorite") or read (mode "read"),
// shown together with a filter by content type. The filter lives in the `type` query parameter.
const TypedContent = ({ libraryId, mode }) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const requested = searchParams.get('type');
    const type = TYPES.includes(requested) ? requested : 'all';
    const isFavorite = mode === 'favorite';
    const filter = isFavorite ? { favorite: true } : { read: true };
    const showAll = type === 'all';

    const books = useGetBooksQuery({ libraryId, ...filter, pageSize: PREVIEW_SIZE, sortDirection: SortDirection.Descending }, { skip: !showAll });
    const poetry = useGetArticlesQuery({ libraryId, type: 'poetry', ...filter, pageSize: PREVIEW_SIZE, sortDirection: SortDirection.Descending }, { skip: !showAll });
    const writings = useGetArticlesQuery({ libraryId, type: 'writing', ...filter, pageSize: PREVIEW_SIZE, sortDirection: SortDirection.Descending }, { skip: !showAll });

    const selectType = (value) => {
        const next = new URLSearchParams(searchParams);
        if (value === 'all') next.delete('type'); else next.set('type', value);
        next.delete('pageNumber');
        setSearchParams(next);
    };

    const sortBy = searchParams.get('sortBy') ?? 'name';
    const sortDirection = searchParams.get('sortDirection') ?? SortDirection.Ascending;
    const pageNumber = parseInt(searchParams.get('pageNumber') ?? '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') ?? '12', 10);
    const listProps = {
        libraryId, sortBy, sortDirection, pageNumber, pageSize,
        favorite: isFavorite ? 'true' : null,
        read: isFavorite ? null : 'true',
        showSearch: false,
        showTitle: false,
    };

    const nothingToShow = showAll && ![books, poetry, writings].some((r) => r.isFetching || (r.data?.data?.length ?? 0) > 0);

    return (
        <Stack>
            <SegmentedControl
                value={type}
                onChange={selectType}
                data={TYPES.map((value) => ({ value, label: t(`myLibrary.type.${value}`) }))}
                style={{ maxWidth: '100%', overflowX: 'auto' }} />
            {showAll && (
                <>
                    <Preview title={t('myLibrary.type.books')} onViewAll={() => selectType('books')} result={books}
                        render={(book) => <BookCard key={book.id} libraryId={libraryId} book={book} />} />
                    <Preview title={t('myLibrary.type.poetry')} onViewAll={() => selectType('poetry')} result={poetry}
                        render={(item) => <PoetryCard key={item.id} libraryId={libraryId} poetry={item} />} />
                    <Preview title={t('myLibrary.type.writings')} onViewAll={() => selectType('writings')} result={writings}
                        render={(item) => <WritingCard key={item.id} libraryId={libraryId} writing={item} />} />
                    {nothingToShow && <Center h={100}><Text>{t('myLibrary.empty')}</Text></Center>}
                </>
            )}
            {type === 'books' && <BooksList {...listProps} />}
            {type === 'poetry' && <PoetryList {...listProps} />}
            {type === 'writings' && <WritingsList {...listProps} />}
        </Stack>
    );
};

TypedContent.propTypes = {
    libraryId: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['favorite', 'read']).isRequired,
};

export default TypedContent;
