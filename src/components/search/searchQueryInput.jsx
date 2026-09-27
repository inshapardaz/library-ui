import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// UI Library imports
import { ActionIcon, CloseButton, Group, Input, Pill, rem, Stack, TextInput, Tooltip } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';

// Local imports
import { IconSearch, IconInfoCircle } from '@/components/icon';
import parseSearchQuery, { findIncompleteOperators, removeOperatorTokens } from '@/utils/searchQueryParser';
//------------------------------

// Only the first value of each type is shown as a chip, matching the API's
// current single-value-per-filter behavior (see #23) - even if the user typed
// more than one @author, only the first one is actually applied.
const FILTER_TYPES = [
    { operator: '@', field: 'authorNames', labelKey: 'search.syntax.author' },
    { operator: '#', field: 'tagNames', labelKey: 'search.syntax.tag' },
    { operator: '$', field: 'languages', labelKey: 'search.syntax.language' },
    { operator: ':', field: 'seriesNames', labelKey: 'search.syntax.series' },
];

// Query-syntax-aware search box: runs parseSearchQuery as the user types and
// shows the resolved @author/#tag/$language/:series filters as removable
// chips, plus a help tooltip explaining the syntax. This is deliberately a
// separate component from the generic <SearchInput> (used for plain-text
// search across bookshelves, authors, series, etc. where this syntax has no
// meaning) rather than added to it.
const SearchQueryInput = ({ query, onQueryChanged, maxWidth = 200 }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(query || '');

    const parsed = useMemo(() => parseSearchQuery(value), [value]);
    const incompleteOperators = useMemo(() => findIncompleteOperators(value), [value]);
    const activeFilters = useMemo(
        () => FILTER_TYPES.filter(({ field }) => parsed[field].length > 0),
        [parsed]
    );

    const submit = (next) => {
        setValue(next);
        onQueryChanged(next);
    };

    const onClear = () => submit('');
    const onSubmit = () => onQueryChanged(value);
    const onRemoveFilter = (operator) => submit(removeOperatorTokens(value, operator));

    const searchIcon = (
        <ActionIcon size={32} disabled={!value || value === ''} variant="transparent" onClick={onSubmit}>
            <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
    );

    return (
        <Stack gap={4}>
            <Input.Wrapper>
                <TextInput
                    placeholder={t('search.placeholder')}
                    value={value}
                    style={{ maxWidth }}
                    onChange={(e) => setValue(e.target.value)}
                    leftSection={searchIcon}
                    rightSectionWidth={72}
                    rightSection={
                        <Group gap={4} wrap="nowrap">
                            {value && value !== '' && <CloseButton onClick={onClear} />}
                            <Tooltip label={t('search.syntax.help')} multiline w={280} withArrow>
                                <ActionIcon variant="subtle" color="gray" aria-label={t('search.syntax.help')}>
                                    <IconInfoCircle style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    }
                    onKeyDown={getHotkeyHandler([['Enter', onSubmit]])}
                />
            </Input.Wrapper>
            {(activeFilters.length > 0 || incompleteOperators.length > 0) && (
                <Pill.Group>
                    {activeFilters.map(({ operator, field, labelKey }) => (
                        <Pill key={operator} withRemoveButton onRemove={() => onRemoveFilter(operator)}>
                            {t(labelKey)}: {parsed[field][0]}
                        </Pill>
                    ))}
                    {incompleteOperators.map((operator) => (
                        <Pill
                            key={operator}
                            variant="contrast"
                            withRemoveButton
                            onRemove={() => onRemoveFilter(operator)}
                        >
                            {t('search.syntax.incomplete', { operator })}
                        </Pill>
                    ))}
                </Pill.Group>
            )}
        </Stack>
    );
};

SearchQueryInput.propTypes = {
    query: PropTypes.string,
    onQueryChanged: PropTypes.func,
    maxWidth: PropTypes.any,
};

export default SearchQueryInput;
