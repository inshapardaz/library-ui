import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Input,
  Menu,
  Visibility,
} from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../languageSwitcher'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router'

function MainMenu() {
  const { t } = useTranslation('common')
  const { status } = useSession()
  const router = useRouter();
  if (status === "authenticated") {
    const { libraryId } = router.query
    if (router.pathname.indexOf('/libraries/') >= 0)
    {
      return (
        <>
          <Menu.Item as={Link} href={`/libraries/${libraryId}/books`}>{t("header.books")}</Menu.Item>
            <Menu.Item as={Link} href={`/libraries/${libraryId}/authors`}>{t("header.authors")}</Menu.Item>
            <Menu.Item as={Link} href={`/libraries/${libraryId}/categories`}>{t("header.categories")}</Menu.Item>
            <Menu.Item as={Link} href={`/libraries/${libraryId}/series`}>{t("header.series")}</Menu.Item>
            <Menu.Item>
              <Input className='icon' icon='search' placeholder='Search...' />
            </Menu.Item>
        </>);
    }
    else {
      return (
        <>
          <Menu.Item as={Link} href="/libraries">{t("libraries")}</Menu.Item>
        </>);
    }
  }

  return null;
}

function UserMenu({fixed}) {
  const { name, status } = useSession()
  const { t } = useTranslation('common')

  const logoutClicked = () => {
    signOut({ callbackUrl: '/' });
  }

  if (status === "authenticated") {
    return (
    <Dropdown pointing className="top right" trigger={<Icon name='user circle'/>} >
      <Dropdown.Menu>
        <Dropdown.Header content={name} />
        <Dropdown.Item icon="setting" text={t('profile.title')} />
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
  const { t } = useTranslation('common')
  const [fixed, setFixed] = useState(false)
  
  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  return (
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
              `<Menu.Item as={Link} href="/" header>
                  <Image size='mini' height={24} width={32}  src='/images/logo.png' alt={t("app")} style={{ width: '32px', marginRight: '1.5em' }} />
                  {t("app")}
                </Menu.Item>
                <MainMenu/>
                <Menu.Item position='right'>
                  <LanguageSwitcher inverted={!fixed} />
                  <div style={{ marginLeft: '0.5em' }}/> 
                  <UserMenu fixed={fixed} />
                </Menu.Item>
              </Container>
            </Menu>
          </Visibility>);
}

DesktopHeader.propTypes = {
  children: PropTypes.node,
}

export default DesktopHeader;