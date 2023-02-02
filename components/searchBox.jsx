import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Input } from 'antd';

function SearchBox({ libraryId })
{   
    const t = useTranslations();
    const router = useRouter();
    const [search, setSearch] = useState('');

    const onSearch = () => {
        router.push(`libraries\\${libraryId}\\search?q=${search}`)
    }
    return (<Input.Search 
                onSearch={onSearch} 
                placeholder={t('search.placeholder')}
            />);
}

export default SearchBox;