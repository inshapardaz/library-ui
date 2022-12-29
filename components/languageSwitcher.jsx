import React, { useEffect } from 'react';
import { useRouter } from "next/router";

// semantic ui 
import { Dropdown } from 'semantic-ui-react'

const iconFor = (locale) => {
  switch (locale) {
    case 'ur': return 'pk';
    case 'en': return 'gb';
  }
}

const dirFor = (locale) => {
  switch (locale) {
    case 'ur': return 'rtl';
    default: return 'ltr';
  }
}
const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  const setLanguage = (e, data) => {
    if (data.value !== activeLocale)
    { 
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: data.value });
    }
  };

  useEffect(() => {
    let lang = router.locale
    let dir = dirFor(lang)
    document.querySelector("html").setAttribute("dir", dir);
    document.querySelector("html").setAttribute("lang", lang);
    document.querySelector("body").setAttribute("dir", dir);
  }, [router.locale]);

  const languageOptions = locales.map( l => ({key: l, text: l, value: l, flag: iconFor(l)}))

  return (
    <Dropdown
    button 
    labeled
    className='icon'
    icon='world'
    onChange={setLanguage}
    options={languageOptions}
    text= {activeLocale }
    />
  );
};

export default LanguageSwitcher;
