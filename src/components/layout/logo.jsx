import { Link } from "react-router-dom";

// 3rd party imports
import { Dropdown, Space } from 'antd';
import { ImLibrary } from "react-icons/im";
import { FiGrid } from "react-icons/fi";

// Local import
import styles from '../../styles/common.module.scss';
import { useGetLibrariesQuery } from '../../features/api/librariesSlice'

// ---------------------------------------------------
export function Logo({ t, library, showLibrarySwitcher = true }) {
  const { data: libraries, isError, isFetching } = useGetLibrariesQuery()

  const items = !isError && !isFetching && libraries && libraries.data ? libraries.data.map(l => ({
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
      <Link to="/" className={styles["header__logo-text"]}> { library ? library.name :  t("app")} </Link>
    </Space>);
}