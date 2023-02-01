import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Input } from 'semantic-ui-react'

function SearchBox({ libraryId })
{   
    const t = useTranslations();
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
                placeholder={t('search.placeholder')}
                onChange={(e) => setSearch(e.target.value)}
            />);
}

export default SearchBox;