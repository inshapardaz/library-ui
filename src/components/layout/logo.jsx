import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 3rd party imports
import { /*App,*/ Dropdown, Space } from 'antd';
import { ImLibrary } from "react-icons/im";
import { FiGrid } from "react-icons/fi";

// Local import
import styles from '../../styles/common.module.scss';
//import libraryService from "@/services/libraryService";

// ---------------------------------------------------
export function Logo({ t, library, showLibrarySwitcher = true }) {
  //const { message } = App.useApp();
  const [libraries] = useState({});

  const loadLibraries = () => {
    // libraryService.getLibraries()
    //     .then(res => setLibraries(res))
    //     .catch(_ => message.error(t('libraries.loadingError')))
  }

  useEffect(() => {
    if (showLibrarySwitcher)
    { 
      loadLibraries();
    }
  }, [showLibrarySwitcher]);

  const items = libraries && libraries.data ? libraries.data.map(l => ({
    key: l.id,
    label : (
      <Link href={`/libraries/${l.id}`}>
        {l.name}
      </Link>
    ),
    icon: <ImLibrary />,
  })) : [];

  const selectedKeys = library ? [library.id] : null
  return (
      <Space size={8} className={styles['header__logo']}>
      { showLibrarySwitcher && <Dropdown menu={{items}} trigger='click' selectable={true}
                selectedKeys= {selectedKeys}>
        <FiGrid size='1.5em'/>
      </Dropdown> }
      <img src="/images/logo.png" alt="logo" height={24} width={24} />
      <span className={styles["header__logo-text"]}> { library ? library.name :  t("app")} </span>
    </Space>);
}