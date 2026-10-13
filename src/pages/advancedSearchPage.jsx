import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// UI library imports
import { Box, Button, Checkbox, Container, Flex, Group, NativeSelect, Stack, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

// Local imports
import BooksList from "@/components/books/booksList";
import { useGetCategoriesQuery } from "@/store/slices/categories.api";
import { SortDirection } from "@/models";
// -----------------------------------------

const FIELDS = ['query', 'author', 'series', 'category', 'language'];
const EMPTY = { query: '', author: '', series: '', category: '', language: '', favorite: false, read: false };

const fromParams = (params) => ({
    ...EMPTY,
    ...Object.fromEntries(FIELDS.map((key) => [key, params.get(key) ?? ''])),
    favorite: params.get('favorite') === 'true',
    read: params.get('read') === 'true',
});

// A form over the book filters the API supports (title, author, series, category, language,
// favorites and reading history). The filters live in the URL, so a search can be linked, and
// the results are the usual book listing.
const AdvancedSearchPage = () => {
    const { t } = useTranslation();
    const { libraryId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [form, setForm] = useState(() => fromParams(searchParams));
    const [debounced] = useDebouncedValue(form, 400);
    const { data: categories } = useGetCategoriesQuery({ libraryId }, { skip: !libraryId });

    // Keep the URL in step with the (debounced) form
    useEffect(() => {
        const next = new URLSearchParams();
        FIELDS.forEach((key) => { if (debounced[key]) next.set(key, debounced[key]); });
        if (debounced.favorite) next.set('favorite', 'true');
        if (debounced.read) next.set('read', 'true');
        setSearchParams(next, { replace: true });
    }, [debounced, setSearchParams]);

    const set = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));
    const applied = fromParams(searchParams);
    const pageNumber = parseInt(searchParams.get("pageNumber") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? "12", 10);

    return (
        <Container fluid px="lg" pt="md">
            <Flex gap="xl" align="flex-start" direction={{ base: 'column', md: 'row' }}>
                <Stack w={{ base: '100%', md: 300 }} style={{ flexShrink: 0 }} gap="sm">
                    <Group justify="space-between">
                        <Title order={2}>{t('advancedSearch.title')}</Title>
                        <Button variant="subtle" size="compact-sm" onClick={() => setForm(EMPTY)}>{t('advancedSearch.reset')}</Button>
                    </Group>
                    <TextInput label={t('advancedSearch.titleContains')} value={form.query}
                        onChange={(event) => set('query')(event.currentTarget.value)} />
                    <TextInput label={t('advancedSearch.author')} value={form.author}
                        onChange={(event) => set('author')(event.currentTarget.value)} />
                    <TextInput label={t('advancedSearch.series')} value={form.series}
                        onChange={(event) => set('series')(event.currentTarget.value)} />
                    <Group grow align="flex-start">
                        <NativeSelect label={t('advancedSearch.category')} value={form.category}
                            onChange={(event) => set('category')(event.currentTarget.value)}
                            data={[{ value: '', label: t('advancedSearch.any') },
                                ...(categories?.data ?? []).map((c) => ({ value: String(c.id), label: c.name }))]} />
                        <NativeSelect label={t('advancedSearch.language')} value={form.language}
                            onChange={(event) => set('language')(event.currentTarget.value)}
                            data={[{ value: '', label: t('advancedSearch.any') },
                                ...['en', 'ur'].map((code) => ({ value: code, label: t(`languages.${code}`) }))]} />
                    </Group>
                    <Checkbox label={t('advancedSearch.favoritesOnly')} checked={form.favorite}
                        onChange={(event) => set('favorite')(event.currentTarget.checked)} />
                    <Checkbox label={t('advancedSearch.historyOnly')} checked={form.read}
                        onChange={(event) => set('read')(event.currentTarget.checked)} />
                </Stack>

                <Box style={{ flex: 1, minWidth: 0 }}>
                    <Title order={3} mb="md">{t('advancedSearch.results')}</Title>
                    <BooksList
                        libraryId={libraryId}
                        query={applied.query || null}
                        authorName={applied.author || null}
                        seriesName={applied.series || null}
                        category={applied.category || null}
                        language={applied.language || null}
                        favorite={applied.favorite ? 'true' : null}
                        read={applied.read ? 'true' : null}
                        sortBy="name"
                        sortDirection={SortDirection.Ascending}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        showSearch={false}
                        showTitle={false}
                        defaultView="list" />
                </Box>
            </Flex>
        </Container>
    );
};

export default AdvancedSearchPage;
