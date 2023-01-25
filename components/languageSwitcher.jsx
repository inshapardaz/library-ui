import React, { useEffect } from 'react';

// 3rd party libraries
import { Dropdown, Typography, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// local imports 

import localeService from '@/services/localeService';
import { useTranslation } from 'react-i18next';

// -------------------------------------------------

const LanguageSwitcher = () => 
{
  const { i18n } = useTranslation();
  const lang = localeService.getLanguage();

  const setLanguage = ({ key }) => 
  {
      localeService.setLanguage(i18n, key)
      let l = localeService.getLanguage();
      document.querySelector("html").setAttribute("dir", l.dir);
      document.querySelector("html").setAttribute("lang", l.locale);
      document.querySelector("body").setAttribute("dir", l.dir);
  };

  const items = Object.values(localeService.getSupportedLanguages())
          .map( l => ({key: l.key, label: l.name }))
  console.log(items);
  return (
    <Dropdown
    menu={{
      languageOptions: items,
      selectable: true,
      onSelect : setLanguage,
      defaultSelectedKeys: [lang.key],
    }}
    >
      <Typography.Link>
        <Space>
          Selectable
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default LanguageSwitcher;
