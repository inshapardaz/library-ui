import PropTypes from 'prop-types'
import { Media } from './media'
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Input,
  Menu,
  Visibility,
} from 'semantic-ui-react'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '../languageSwitcher'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import { useLogout } from "../../hooks/auth/useLogout";
import { useRouter } from 'next/router'


function UserMenu({fixed}) {
  const { user } = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();
  const { t } = useTranslation()

  const logoutClicked = () => {
    logout()
    .then(() => router.push("/"));
  }

  if (user) {
    return (
    <Dropdown pointing className="top right" trigger={<Icon name='user circle'/>} >
      <Dropdown.Menu>
        <Dropdown.Header content={user.name} />
        <Dropdown.Item icon="setting" text={t('header.profile')} />
        <Dropdown.Item icon="lock" text={t('changePassword.title')} as={Link} href="/change-password"/ >
        <Dropdown.Divider />
        <Dropdown.Item icon="sign-out" text={t('logout')} onClick={logoutClicked} />
      </Dropdown.Menu>
    </Dropdown>);
  }
  
  return (<>
    <Button as={Link} href="/login" inverted={!fixed} >
      {t("login")}
    </Button>
    <div style={{ marginLeft: '0.5em' }}/> 
    <Button as={Link} href="/register" inverted={!fixed} primary={fixed}>
      {t("register")}
    </Button>
    </>);
}
function DesktopHeader () {
  const { t } = useTranslation()
  const [fixed, setFixed] = useState(false)
  
  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  return (
    <Media greaterThan='mobile'>
       <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              style={{ backgroundColor: !fixed ? '#1b1c1d' : 'white' }}
            >
              <Container>
                <Menu.Item>
                  <Image data-ft="logo" height={24} width={24} alt={t("header.books")} src="/images/logo.png" />
                </Menu.Item>
                <Menu.Item as='a'>{t("header.books")}</Menu.Item>
                <Menu.Item as='a'>{t("header.authors")}</Menu.Item>
                <Menu.Item as='a'>{t("header.categories")}</Menu.Item>
                <Menu.Item as='a'>{t("header.series")}</Menu.Item>
                <Menu.Item>
                  <Input className='icon' icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <LanguageSwitcher inverted={!fixed} />
                  <div style={{ marginLeft: '0.5em' }}/> 
                  <UserMenu fixed={fixed} />
                </Menu.Item>
              </Container>
            </Menu>
          </Visibility>
    </Media>);
}

DesktopHeader.propTypes = {
  children: PropTypes.node,
}

export default DesktopHeader;