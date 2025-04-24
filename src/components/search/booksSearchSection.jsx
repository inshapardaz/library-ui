import PropTypes from 'prop-types';
import { useMemo } from 'react';

// Ui Library Imports
import { Group, Center, Text } from '@mantine/core';
import { Spotlight, SpotlightActionsGroup } from '@mantine/spotlight';

// Local imports
import { IconBooks } from "@/components/icon";
import { useGetBooksQuery } from "@/store/slices/books.api";
import Img from '@/components/img';

//-----------------------------
const BooksSearchSection = ({ t, navigate, libraryId, query, pageSize = 3 }) => {
    const {
        data: books, isError: booksError, isFetching: booksLoading,
    } = useGetBooksQuery({
        libraryId,
        query,
        pageSize
    }, {
        skip: query.length < 3
    });

    const hasBooks = useMemo(() => !booksLoading && !booksError && books?.data?.length > 0, [booksLoading, booksError, books]);

    const icon = <IconBooks width={24} stroke={1.5} />;

    if (!hasBooks) {

        if (query.length < 3) {
            return (<Spotlight.Action key={t('header.books')}
                label={t('header.books')}
                description={t('books.description')}
                leftSection={icon}
                onClick={() => navigate(`/libraries/${libraryId}/books`)} />);
        }
        return null;
    }

    return (<SpotlightActionsGroup label={t('header.books')}>
        {books.data
            .map((book) => <Spotlight.Action key={book.id}
                onClick={() => navigate(`/libraries/${libraryId}/books/${book.id}`)}>
                <Group wrap="nowrap" w="100%">
                    <Center>
                        <Img
                            src={book.links.image}
                            h={50}
                            w={24}
                            alt={book.title}
                            fit="contain"
                            fallback={icon} />
                    </Center>

                    <div style={{ flex: 1 }}>
                        <Text>{book.title}</Text>

                        {book.description && (
                            <Text opacity={0.6} size="xs" truncate="end">
                                {book.description}
                            </Text>
                        )}
                    </div>
                </Group>
            </Spotlight.Action>)}
    </SpotlightActionsGroup>);
};

BooksSearchSection.propTypes = {
    t: PropTypes.any.isRequired,
    navigate: PropTypes.any.isRequired,
    libraryId: PropTypes.string.isRequired,
    query: PropTypes.string,
    pageSize: PropTypes.number,
};


export default BooksSearchSection;
