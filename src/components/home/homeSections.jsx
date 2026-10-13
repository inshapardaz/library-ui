import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library imports
import { Box, Divider, Stack, Title } from '@mantine/core';

// Local imports
import { SortDirection } from '@/models';
import { useGetArticlesQuery } from '@/store/slices/articles.api';
import { useGetAuthorsQuery } from '@/store/slices/authors.api';
import WritingCard from '@/components/writings/writingCard';
import PoetryCard from '@/components/poetry/poetryCard';
import AuthorCard from '@/components/authors/authorCard';
import CategoryChips from '@/components/explore/categoryChips';
import CarouselSection from './carouselSection';

//------------------------------

const latest = { sortBy: 'dateCreated', sortDirection: SortDirection.Descending, pageSize: 10 };

export const LatestWritings = ({ libraryId }) => {
    const { t } = useTranslation();
    const result = useGetArticlesQuery({ libraryId, type: 'writing', ...latest });
    return (
        <CarouselSection
            title={t('homePage.newWritings')}
            viewAllTo={`/libraries/${libraryId}/explore/writings?sortBy=dateCreated&sortDirection=descending`}
            result={result}
            render={(writing) => <WritingCard libraryId={libraryId} writing={writing} />} />
    );
};

export const LatestPoetry = ({ libraryId }) => {
    const { t } = useTranslation();
    const result = useGetArticlesQuery({ libraryId, type: 'poetry', ...latest });
    return (
        <CarouselSection
            title={t('homePage.newPoetry')}
            viewAllTo={`/libraries/${libraryId}/explore/poetry?sortBy=dateCreated&sortDirection=descending`}
            result={result}
            render={(poetry) => <PoetryCard libraryId={libraryId} poetry={poetry} />} />
    );
};

export const FeaturedAuthors = ({ libraryId }) => {
    const { t } = useTranslation();
    const result = useGetAuthorsQuery({ libraryId, sortBy: 'bookCount', sortDirection: SortDirection.Descending, pageSize: 10 });
    return (
        <CarouselSection
            title={t('homePage.featuredAuthors')}
            viewAllTo={`/libraries/${libraryId}/explore/authors`}
            result={result}
            render={(author) => <AuthorCard libraryId={libraryId} author={author} />} />
    );
};

export const BrowseByCategory = ({ libraryId }) => {
    const { t } = useTranslation();
    return (
        <Box>
            <Stack>
                <Title order={3}>{t('homePage.browseByCategory')}</Title>
                <CategoryChips libraryId={libraryId} type="books"
                    to={(category) => `/libraries/${libraryId}/explore/books?category=${category.id}`} />
                <Divider my="md" />
            </Stack>
        </Box>
    );
};

const sectionProps = { libraryId: PropTypes.string.isRequired };
LatestWritings.propTypes = sectionProps;
LatestPoetry.propTypes = sectionProps;
FeaturedAuthors.propTypes = sectionProps;
BrowseByCategory.propTypes = sectionProps;

