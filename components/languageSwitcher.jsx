import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// 3rd party libraries
import { Dropdown, Button } from 'antd';
import { FaGlobe } from 'react-icons/fa';
// local imports 

import localeService from '@/services/localeService';

// -------------------------------------------------

const items = Object.values(localeService.getSupportedLanguages())
    .map( l => ({key: l.key, label: l.name }));

const LanguageSwitcher = ({ openUp = false}) => 
{
  const router = useRouter();
  const lang = localeService.getLanguage();

  const setLanguage = ({ key }) => 
  {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: key });
  };

  useEffect(() => {
    let l = localeService.getLanguage(router.locale);
      document.querySelector("html").setAttribute("dir", l.dir);
      document.querySelector("html").setAttribute("lang", l.locale);
      document.querySelector("body").setAttribute("dir", l.dir);
  }, []);

  return (
    <Dropdown 
    placement={openUp ? 'topLeft' : 'bottomLeft'}
    menu={{
      items,
      selectable: true,
      onSelect : setLanguage,
      defaultSelectedKeys: [lang.key],
    }}
    >
      <Button >
        <FaGlobe />
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
