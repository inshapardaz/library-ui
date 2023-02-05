import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router'

// 3rd party imports
import { Layout, Menu, App, Dropdown, Button, Space, theme, Typography } from 'antd';
import { FaBook, FaUser, FaPenFancy, FaFeatherAlt, FaTags, FaTag, FaHome, FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { ImBooks, ImLibrary, ImNewspaper, ImProfile } from 'react-icons/im';
import { MdPassword } from 'react-icons/md';

// Local Imports
import styles from '../../styles/common.module.scss'
import libraryService from "@/services/libraryService";
import LanguageSwitcher from "@/components/languageSwitcher";
import DarkModeToggle from "@/components/darkModeToggle";
import Image from "next/image";

// ---------------------------------------------------

function AppHeader () {
  const t = useTranslations();
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const { data, status } = useSession()
  const [libraries, setLibraries] = useState({});
  const [library, setLibrary] = useState({});
  const [categories, setCategories] = useState({});
  const router = useRouter();
  let items = [];
  const { libraryId } = router.query

  useEffect(() => {
    const loadLibraries = () => {
      libraryService.getLibraries()
          .then(res => setLibraries(res))
          .catch(_ => message.error(t('libraries.loadingError')))
    }
  
    const loadLibrary = () => {
      libraryService.getLibrary(libraryId)
      .then(res => setLibrary(res))
      .catch((e) => {
        console.error(e)
        message.error(t('library.loadingError'))
      })
    }

    const loadCategories = () => {
      libraryService.getCategories(libraryId)
      .then(res => setCategories(res))
      .catch((e) => {
        console.error(e)
        message.error(t('categories.loadingError'))
      })
    }

      if (libraryId) {
      loadLibraries();
      loadLibrary();
      loadCategories();
    }
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
      type: 'divider'
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
      label: t('header.logout'),
      key: 'sign-out',
      icon: <FiLogOut />,
      onClick: logoutClicked
    }]
  : [{
      label: (
        <Link href='/login'>
          {t('login.title')}
        </Link>),
      key: 'login',
      icon: <FiLogIn />,
    },{
      type: 'divider'
    },{
      label: (
        <Link href='/register'>
          {t('register.title')}
        </Link>),
      key: 'register',
      icon: <FaUserCircle />,
    }];

  const catItems = categories && categories.data && categories.data.map(c => ({
    label : (
      <Link href={`/libraries/${libraryId}/books?categories=${c.id}`}>
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
          {t("header.home")}
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
        <Link href={`/libraries/${libraryId}/writings`}>
          {t("header.writings")}
        </Link>
      ),
      key: 'writings',
      icon: <FaPenFancy />,
    },{
      label: (
        <Link href={`/libraries/${libraryId}/authors`}>
          {t("header.authors")}
        </Link>
      ),
      key: 'authors',
      icon: <FaFeatherAlt />,
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

    if (library.supportsPeriodicals)  {
      items.push({
        label: (
          <Link href={`/libraries/${libraryId}/periodicals`}>
            {t("header.periodicals")}
          </Link>
        ),
        key: 'periodicals',
        icon: <ImNewspaper />,
      });
    }
  }
  else {
    items = [{
      label: (
        <Link href='/libraries'>
          {t("header.libraries")}
        </Link>
      ),
      key: 'libraries',
      icon: <ImLibrary />,
    },{
      type: 'divider'
    }];
  }

  return (<Layout.Header  className={styles.header} style={{ backgroundColor : token.colorBgContainer}}>
      <Link href="/" className={styles['header__logo']}>
          <Space size={8}>
            <Image src="/images/logo.png" alt="logo" height={24} width={24} />
            <span> {t("app")} </span>
          </Space>
      </Link>
      <Menu
        className={styles['header__menu']}
        mode="horizontal"
        selectable={false}
        expandIcon={true}
        items={items}
        onClick={onMenuClick}
      />
      <DarkModeToggle />
      <LanguageSwitcher arrow round/>
      <Dropdown arrow
        className={styles['header__profile']}
        placement='bottomRight'
        menu={{
          items: profileItems,
          selectable: false,
        }}
      >
        <Button shape="circle">
          <Space>
            <FaUser />
          </Space>
        </Button>
      </Dropdown>
    </Layout.Header>);
}

export default AppHeader;