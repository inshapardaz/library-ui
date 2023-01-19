import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Input } from 'semantic-ui-react'

function SearchBox({ libraryId })
{   
    const { t } = useTranslation();
    const router = useRouter();
    const [search, setSearch] = useState('');

    const onSearch = () => {
        router.push(`libraries\\${libraryId}\\search?q=${search}`)
    }
    return (<Input 
                fluid 
                action={{ 
                    icon: 'search',
                    onClick: () => onSearch()
                }} 
                placeholder={t('library.search.placeholder')}
                onChange={(e) => setSearch(e.target.value)}
            />);
}

export default SearchBox;