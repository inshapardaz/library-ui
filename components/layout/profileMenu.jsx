import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";
import { Dropdown, Button, Space } from 'antd';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { MdPassword } from 'react-icons/md';

// --------------------------------------------
export function ProfileMenu() {
  const t = useTranslations();
  const { data, status } = useSession();

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
