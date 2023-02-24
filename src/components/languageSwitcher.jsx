import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

// 3rd party libraries
import { Dropdown, Button } from 'antd';
import urPK from 'antd/locale/ur_PK';
import enGB from 'antd/locale/en_GB';
import { FaGlobe } from 'react-icons/fa';
// local imports 

//import localeService from '@/services/localeService';

// -------------------------------------------------
const languages = {
    'en'  : { key:"en", locale:'en_GB', name: 'English', dir : 'ltr', flag: 'gb', antdLocale : enGB },
    'ur'  : { key:"ur", locale:'ur_PK', name: 'اردو', dir : 'rtl', flag: 'pk' , antdLocale : urPK }
}

const items = Object.values(languages)
    .map( l => ({key: l.key, label: l.name }));

const LanguageSwitcher = ({ openUp = false, round }) => 
{
  const { i18n } = useTranslation()
  const lang = i18n.language || window.localStorage.i18nextLng

    const setLanguage = ({ key }) => 
    {
      i18n.changeLanguage(key);
    };

  useEffect(() => {
    console.log(lang)
    let l = languages[lang];
      document.querySelector("html").setAttribute("dir", l.dir);
      document.querySelector("html").setAttribute("lang", l.locale);
      document.querySelector("body").setAttribute("dir", l.dir);
  }, [lang]);

  return (
    <Dropdown 
    placement={openUp ? 'topLeft' : 'bottomRight'}
    menu={{
      items,
      selectable: true,
      onSelect : setLanguage,
      defaultSelectedKeys: [lang.key],
    }}
    >
      <Button shape={ round ? "circle" : 'default' }>
        <FaGlobe />
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;