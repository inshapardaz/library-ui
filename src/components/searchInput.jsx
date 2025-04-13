import PropTypes from 'prop-types';

// Local imports
import { IconSearch } from '@/components/icon';
import { ActionIcon, rem, CloseButton, Input, TextInput, Group } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

//------------------------------
const SearchInput = ({ query, onQueryChanged, maxWidth = 200 }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(query || '');
    const searchIcon = (<ActionIcon size={32} disabled={!value || value == ''} variant='transparent'
        onClick={() => onQueryChanged(value)}>
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    </ActionIcon>);

    const onClear = () => {
        setValue("");
        onQueryChanged("");
    };

    const onSubmit = () => {
        onQueryChanged(value);
    };

    let closeIcon = null;
    if (value && value != '') {
        closeIcon = (<CloseButton onClick={onClear} />);
    }

    return (<Input.Wrapper>
        <TextInput
            placeholder={t('search.title')}
            value={value}
            style={{ maxWidth }}
            onChange={e => setValue(e.target.value)}
            leftSection={searchIcon}
            rightSectionWidth={42}
            rightSection={<Group>
                {closeIcon}
            </Group>}
            onKeyDown={getHotkeyHandler([
                ['Enter', onSubmit]
            ])} />
    </Input.Wrapper>);
};

SearchInput.propTypes = {
    query: PropTypes.string,
    onQueryChanged: PropTypes.func,
    maxWidth: PropTypes.any
}

export default SearchInput;
