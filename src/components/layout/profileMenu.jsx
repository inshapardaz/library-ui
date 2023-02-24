import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
//import { useSession } from "next-auth/react";
//import { signOut } from 'next-auth/react';

// 3rd party libraries
import { Dropdown, Button, Space } from 'antd';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { MdPassword } from 'react-icons/md';

// --------------------------------------------
const ProfileMenu = () => {
  const { t } = useTranslation();
  const data = { name : 'Guest'}
  const status = "authenticated"
  //const { data, status } = useState();

  const logoutClicked = () => {
    //signOut({ callbackUrl: '/' });
  }

  const profileItems = (status === "authenticated") ?
    [{
      label: data ? data.name : '',
      key: 'username',
      icon: <FaUserCircle />
    }, {
      type: 'divider'
    }, {
      label: t('profile.title'),
      key: 'profile',
      icon: <ImProfile />
    }, {
      label: (
        <Link href='/change-password'>
          {t('changePassword.title')}
        </Link>),
      key: 'change-password',
      icon: <MdPassword />
    }, {
      type: 'divider'
    }, {
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
      icon: <FiLogIn />
    }, {
      type: 'divider'
    }, {
      label: (
        <Link href='/register'>
          {t('register.title')}
        </Link>),
      key: 'register',
      icon: <FaUserCircle />
    }];

  return (<Dropdown arrow
    placement='bottomRight'
    menu={{
      items: profileItems,
      selectable: false
    }}
  >
    <Button shape="circle">
      <Space>
        <FaUser />
      </Space>
    </Button>
  </Dropdown>);
}

export default ProfileMenu