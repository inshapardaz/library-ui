import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import { Anchor, Badge, Group, NavLink, Skeleton, Stack, Text, TextInput, Title } from '@mantine/core';

// Local imports
import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import PeriodicalFrequency from '@/models/periodicalFrequency';
import {
    Icon,
    IconBooks,
    IconCategory,
    IconFavorite,
    IconNames,
    IconSearch,
    IconSliders,
} from '@/components/icon';

//------------------------------

const COUNT_FIELD = {
    books: 'bookCount',
    writings: 'articleCount',
    poetry: 'poetryCount',
    periodicals: 'periodicalCount',
};

const TITLE_ICONS = {
    writings: IconNames.Writings,
    poetry: IconNames.Poetry,
};

const TITLE_KEYS = { writings: 'header.writings', poetry: 'header.poetry' };

const FREQUENCIES = Object.keys(PeriodicalFrequency).filter((key) => key !== 'All');

const SidebarLink = ({ icon, label, count, active, to, onClick }) => (
    <NavLink
        component={to ? Link : undefined}
        to={to}
        onClick={onClick}
        active={active}
        label={label}
        leftSection={icon}
        rightSection={count != null ? <Text size="xs" c="dimmed">{count}</Text> : null}
        variant="subtle"
        style={{ borderRadius: 'var(--mantine-radius-sm)' }}
    />
);

SidebarLink.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.string,
    count: PropTypes.number,
    active: PropTypes.bool,
    to: PropTypes.string,
    onClick: PropTypes.func,
};

// The filters beside an Explore listing (desktop): quick links to the reader's own lists,
// search, and the categories (or, for periodicals, the publication frequency).
const ExploreSidebar = ({ libraryId, type, category, onCategory, query, onQuery, frequency, onFrequency }) => {
    const { t } = useTranslation();
    const base = `/libraries/${libraryId}`;
    const { data: categories, isFetching } = useGetCategoriesQuery({ libraryId }, { skip: !libraryId });
    const field = COUNT_FIELD[type];
    const items = (categories?.data ?? []).filter((c) => c[field] > 0);
    const total = items.reduce((sum, c) => sum + (c[field] ?? 0), 0);
    const hasFilter = Boolean(category || query || frequency);

    if (type === 'periodicals') {
        return (
            <Stack gap={2}>
                <SidebarLink label={t('exploreSidebar.allFrequencies')} active={!frequency} onClick={() => onFrequency(null)} />
                {FREQUENCIES.map((key) => (
                    <SidebarLink key={key} label={t(`periodical.frequency.${key.toLowerCase()}`)}
                        active={frequency === PeriodicalFrequency[key]}
                        onClick={() => onFrequency(PeriodicalFrequency[key])} />
                ))}
            </Stack>
        );
    }

    return (
        <Stack gap="lg">
            {type !== 'books' && (
                <Group gap="xs">
                    <Icon name={TITLE_ICONS[type]} height={26} style={{ color: 'var(--mantine-primary-color-filled)' }} />
                    <Title order={3}>{t(TITLE_KEYS[type])}</Title>
                </Group>
            )}

            <Stack gap={2}>
                <SidebarLink icon={<IconFavorite height={18} />} label={t('myLibrary.sections.favorites')}
                    to={`${base}/my/favorites?type=${type}`} />
                {type === 'books' && (
                    <SidebarLink icon={<IconBooks height={18} />} label={t('exploreSidebar.recentReads')}
                        to={`${base}/my/history`} />
                )}
                <SidebarLink icon={<IconBooks height={18} />}
                    label={type === 'books' ? t('books.allBooks') : t('literature.all', { noun: t(TITLE_KEYS[type]).toLowerCase() })}
                    count={type === 'books' ? undefined : total}
                    active={!hasFilter}
                    onClick={() => { onCategory(null); onQuery(''); }} />
            </Stack>

            {type === 'books' && (
                <Stack gap="xs">
                    <Text fw={600} size="sm">{t('exploreSidebar.search')}</Text>
                    <TextInput
                        key={query ?? ''}
                        defaultValue={query ?? ''}
                        placeholder={t('exploreSidebar.searchPlaceholder')}
                        leftSection={<IconSearch height={16} />}
                        aria-label={t('exploreSidebar.search')}
                        onKeyDown={(event) => { if (event.key === 'Enter') onQuery(event.currentTarget.value); }}
                        onBlur={(event) => { if (event.currentTarget.value !== (query ?? '')) onQuery(event.currentTarget.value); }} />
                    <Anchor component={Link} to={`${base}/search/advanced`} size="sm" fw={600}>
                        <Group gap={6} wrap="nowrap"><IconSliders height={16} />{t('exploreSidebar.advancedSearch')}</Group>
                    </Anchor>
                </Stack>
            )}

            <Stack gap="xs">
                <Text fw={600} size="sm">{t('exploreSidebar.categories')}</Text>
                {isFetching && <Skeleton height={28} radius="xl" />}
                {type === 'books' ? (
                    <Group gap="xs">
                        {items.map((c) => (
                            <Badge key={c.id} component="button" type="button" size="lg"
                                variant={String(category) === String(c.id) ? 'light' : 'outline'}
                                color={String(category) === String(c.id) ? 'accent' : 'gray'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => onCategory(String(category) === String(c.id) ? null : c.id)}>
                                {c.name}
                            </Badge>
                        ))}
                    </Group>
                ) : (
                    <Stack gap={2}>
                        {items.map((c) => (
                            <SidebarLink key={c.id} icon={<IconCategory height={18} />} label={c.name} count={c[field]}
                                active={String(category) === String(c.id)}
                                onClick={() => onCategory(String(category) === String(c.id) ? null : c.id)} />
                        ))}
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

ExploreSidebar.propTypes = {
    libraryId: PropTypes.string,
    type: PropTypes.string.isRequired,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onCategory: PropTypes.func.isRequired,
    query: PropTypes.string,
    onQuery: PropTypes.func.isRequired,
    frequency: PropTypes.string,
    onFrequency: PropTypes.func,
};

export default ExploreSidebar;
