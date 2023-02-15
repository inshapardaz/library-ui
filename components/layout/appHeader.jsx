import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router'
import { useMediaQuery } from "usehooks-ts";

// 3rd party imports
import { Menu, App, Button, theme, Drawer, Row, Col } from 'antd';
import { FaBook, FaPenFancy, FaFeatherAlt, FaTags, FaTag, FaHome, FaBars } from 'react-icons/fa';
import { ImBooks, ImLibrary, ImNewspaper } from 'react-icons/im';

// Local Imports
import styles from '@/styles/common.module.scss'
import libraryService from "@/services/libraryService";
import LanguageSwitcher from "@/components/languageSwitcher";
import DarkModeToggle from "@/components/darkModeToggle";
import { Logo } from "./logo";
import { ProfileMenu } from "./profileMenu";

//---------------------------------------------

function AppHeader () {
  const t = useTranslations();
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const [library, setLibrary] = useState({});
  const [categories, setCategories] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery(["(max-width: 600px)"], [true], false); 

  let items = [];
  const { libraryId } = router.query

  useEffect(() => {  
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
        loadLibrary();
        loadCategories();
    }
  }, [libraryId, message, t]);

  

  const isLibraryPage = () => router.pathname.indexOf('/libraries/') >= 0;
  const onMenuClick = ({key}) => {
    setMobileMenuOpen(false);
  }


  const catItems = categories && categories.data && categories.data.map(c => ({
    label : (
      <Link href={`/libraries/${libraryId}/books?categories=${c.id}`}>
        {c.name}
      </Link>
    ),
    key: c.id,
    icon: <FaTag />,
  }))

  if (isLibraryPage())
  {
    items = [{
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

  const menu = (<Menu
    className={ isMobile ? styles['header__menu'] : null}
    style={{ backgroundColor : 'transparent', border: 'none' }}
    mode={isMobile ? "inline" : "horizontal" }
    selectable={false}
    expandIcon={true}
    items={items}
    onClick={onMenuClick}
  />);

  if (isMobile) {
    return (
      <Row className={styles.header} style={{ backgroundColor : token.colorBgContainer}}>
        <Col><Logo t={t} /></Col>
        <Col flex="auto"></Col>
        <Col>
          <DarkModeToggle />
          <LanguageSwitcher arrow round/>
          <ProfileMenu />
          <Button onClick = { () => setMobileMenuOpen(true) } icon={<FaBars color={token.colorText} />} ghost />
        </Col>
        <Drawer
              title={<Logo t={t} showLibrarySwitcher={false}  />}
              closable={true}
              width="100%"
              onClose = { () => setMobileMenuOpen(false) }
              open={ mobileMenuOpen }
          >
              <Menu>{menu}</Menu>
          </Drawer>
      </Row>);
  }

  return (<Row className={styles.header} gutter={{ m:8, s:4 }} style={{ backgroundColor : token.colorBgContainer}}>
      <Col>
        <Logo t={t} library={library} />
      </Col>
      <Col flex="auto">{menu}</Col>
      <Col>
        <DarkModeToggle />
      </Col>
      <Col>
        <LanguageSwitcher arrow round/>
      </Col>
      <Col>
        <ProfileMenu />
      </Col>
    </Row>);
}

export default AppHeader;