import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

// 3rd party params
import { Input } from 'antd';

// --------------------------------------------

function SearchBox()
{   
    const { t } = useTranslation();
    const { libraryId } = useSearchParams()
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const onSearch = () => {
        navigate(`libraries\\${libraryId}\\search?q=${search}`)
    }
    return (<Input.Search 
        onChange={ e => setSearch(e.target.value)}
        onSearch={onSearch} 
        placeholder={t('search.placeholder')}
    />);
}

export default SearchBox;