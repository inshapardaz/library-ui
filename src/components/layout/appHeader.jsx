import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "usehooks-ts";
import { NavLink, useParams } from "react-router-dom";

// 3rd party imports
import { Menu, Button, theme, Drawer, Row, Col } from 'antd';
import { FaBook, FaPenFancy, FaFeatherAlt, FaTags, FaTag, FaHome, FaBars } from 'react-icons/fa';
import { ImBooks, ImLibrary, ImNewspaper } from 'react-icons/im';

// Local Imports
import styles from '../../styles/common.module.scss'
import LanguageSwitcher from "../languageSwitcher";
import DarkModeToggle from "../darkModeToggle";
import { Logo } from "./logo";
import ProfileMenu from "./profileMenu";
import { useGetLibraryQuery } from '../../features/api/librariesSlice'
import { useGetCategoriesQuery } from '../../features/api/categoriesSlice'

//---------------------------------------------

function AppHeader () {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(["(max-width: 600px)"], [true], false); 
  const { libraryId } = useParams()
  const { data: library } = useGetLibraryQuery({libraryId}, { skip : !libraryId })
  const { data: categories, error, isFetching } = useGetCategoriesQuery({libraryId}, { skip : !libraryId })
  
  let items = [];

  const onMenuClick = ({key}) => {
    setMobileMenuOpen(false);
  }

  const catItems = !error && !isFetching && categories && categories.data && categories.data.map(c => ({
    label : (
      <NavLink to={`/libraries/${libraryId}/books?categories=${c.id}`}>
        {c.name}
      </NavLink>
    ),
    key: c.id,
    icon: <FaTag />,
  }))

  if (library)
  {
    items = [{
      label: (
        <NavLink to={`/libraries/${libraryId}`}>
          {library.name}
        </NavLink>
      ),
      key: 'home',
      icon: <FaHome />,
    },{
      label: (
        <NavLink to={`/libraries/${libraryId}/books`}>
          {t("header.books")}
        </NavLink>
      ),
      key: 'books',
      icon: <FaBook />,
    },{
      label: (
        <NavLink to={`/libraries/${libraryId}/writings`}>
          {t("header.writings")}
        </NavLink>
      ),
      key: 'writings',
      icon: <FaPenFancy />,
    },{
      label: (
        <NavLink to={`/libraries/${libraryId}/authors`}>
          {t("header.authors")}
        </NavLink>
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
        <NavLink to={`/libraries/${libraryId}/series`}>
          {t("header.series")}
        </NavLink>
      ),
      key: 'series',
      icon: <ImBooks />,
    }];

    if (library.supportsPeriodicals)  {
      items.push({
        label: (
          <NavLink to={`/libraries/${libraryId}/periodicals`}>
            {t("header.periodicals")}
          </NavLink>
        ),
        key: 'periodicals',
        icon: <ImNewspaper />,
      });
    }
  }
  else {
    items = [{
      label: (
        <NavLink to='/libraries'>
          {t("header.libraries")}
        </NavLink>
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
        <Col><Logo t={t} library={library} /></Col>
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