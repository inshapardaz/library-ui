import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router'

// 3rd party imports
import { Layout, Menu, App, Dropdown, Button, Space } from 'antd';
import { FaBook, FaUser, FaTags, FaTag, FaHome, FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { ImBooks, ImLibrary, ImProfile } from 'react-icons/im';
import { MdPassword } from 'react-icons/md';

// Local Imports
import styles from '../../styles/common.module.scss'
import libraryService from "@/services/libraryService";
import LanguageSwitcher from "@/components/languageSwitcher";

// ---------------------------------------------------

function AppHeader () {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { data, status } = useSession()
  const [libraries, setLibraries] = useState({});
  const [categories, setCategories] = useState({});
  const router = useRouter();
  let items = [];
  const { libraryId } = router.query

  useEffect(() => {
    const loadLibraries = () => {
      libraryService.getLibraries()
          .then(res => setLibraries(res))
          .catch(_ => message.error(t('libraries.message.loading.error')))
    }
  
    const loadCategories = () => {
      libraryService.getCategories(libraryId)
      .then(res => setCategories(res))
      .catch((e) => {
        console.error(e)
        message.error(t('categories.messages.error.loading'))
      })
    }

    if ((status === "authenticated")) {
      loadLibraries();
    }
    loadCategories();
  }, [libraryId, message, t, status]);

  

  const isLibraryPage = () => router.pathname.indexOf('/libraries/') >= 0;
  const onMenuClick = ({key}) => {
    switch (key){
      case 'logout': 
        logoutClicked();
        break;
    }
  }
  const logoutClicked = () => {
    signOut({ callbackUrl: '/' });
  }

  const profileItems = (status === "authenticated") ?
    [{
      label: data ? data.name : '',
      key: 'username',
      icon: <FaUserCircle />,
    },{
      label: t('profile.title'),
      key: 'profile',
      icon: <ImProfile />,
    },{
      label: (
        <Link href='/change-password'>
          {t('changePassword.title')}
        </Link>),
      key: 'change-password',
      icon: <MdPassword />,
    },{
      type: 'divider'
    },{
      label: t('logout'),
      key: 'sign-out',
      icon: <FiLogOut />,
      onClick: logoutClicked
    }]
  : [{
    label: (
      <Link href='/login'>
        {t('login')}
      </Link>),
    key: 'login',
    icon: <FiLogIn />,
  },{
    label: (
      <Link href='/register'>
        {t('register')}
      </Link>),
    key: 'register',
    icon: <FaUserCircle />,
  }];

  const catItems = categories && categories.data && categories.data.map(c => ({
    label : (
      <Link href={`/libraries/${libraryId}/books?category=${c.id}`}>
        {c.name}
      </Link>
    ),
    key: c.id,
    icon: <FaTag />,
  }))

  const libItems = libraries && libraries.data && libraries.data.map(l => ({
    label : (
      <Link href={`/libraries/${l.id}`}>
        {l.name}
      </Link>
    ),
    key: l.id,
    icon: <ImLibrary />,
  }));

  if (isLibraryPage())
  {
    items = [{
      key: 'libraries',
      icon: <ImLibrary />,
      children: libItems
    },{
      label: (
        <Link href={`/libraries/${libraryId}`}>
          {t("home")}
        </Link>
      ),
      key: 'home',
      icon: <FaHome />,
    },{
      label: (
        <Link href={`/libraries/${libraryId}/books`}>
          {t("header.books")}
        </Link>
      ),
      key: 'books',
      icon: <FaBook />,
    },{
      label: (
        <Link href={`/libraries/${libraryId}/authors`}>
          {t("header.authors")}
        </Link>
      ),
      key: 'authors',
      icon: <FaUser />,
    },{
      label: t("header.categories"),
      key: 'categories',
      icon: <FaTags />,
      children : catItems
    },{
      label: (
        <Link href={`/libraries/${libraryId}/series`}>
          {t("header.series")}
        </Link>
      ),
      key: 'series',
      icon: <ImBooks />,
    }];
  }
  else {
    items = [{
      label: (
        <Link href='/libraries'>
          {t("libraries.header")}
        </Link>
      ),
      key: 'libraries',
      icon: <ImLibrary />,
    },{
      type: 'divider'
    }];
  }

  return (<Layout.Header className={styles.header}>
      <Link href="/" className={styles['header__logo']} >
          <span className={styles['header__logo-text']}>{t("app")}</span>
      </Link>)
      <Menu
        className={styles['header__menu']}
        theme="dark"
        mode="horizontal"
        selectable={false}
        expandIcon={true}
        items={items}
        onClick={onMenuClick}
      />
      <LanguageSwitcher arrow round ghost/>
      <Dropdown arrow
        className={styles['header__profile']}
        placement='bottomRight'
        menu={{
          items: profileItems,
          selectable: false,
        }}
      >
        <Button shape="circle" ghost>
          <Space>
            <FaUser />
          </Space>
        </Button>
      </Dropdown>
    </Layout.Header>);
}

export default AppHeader;