import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

// 3rd party libraries
import { Dropdown, Button } from 'antd';
import { FaGlobe } from 'react-icons/fa';

// local imports 
import { setLocale, languages, selectedLanguage } from '../features/ui/uiSlice';

// -------------------------------------------------

const items = Object.values(languages)
    .map( l => ({key: l.key, label: l.name }));

const LanguageSwitcher = ({ openUp = false, round }) => 
{
  const dispatch = useDispatch();
  const lang = useSelector(selectedLanguage)
  const { i18n } = useTranslation()
  const setLanguage = ({ key }) => {
    i18n.changeLanguage(key);
    dispatch(setLocale(key));
  };

  useEffect(() => {
      document.querySelector("html").setAttribute("dir", lang.dir);
      document.querySelector("html").setAttribute("lang", lang.locale);
      document.querySelector("body").setAttribute("dir", lang.dir);
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