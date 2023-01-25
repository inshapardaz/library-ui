import PropTypes from 'prop-types'
import { Media } from './media'

import {
  Button,
  Container,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react'

import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../languageSwitcher'
import Image from 'next/image'
import { useState } from 'react'

function MobileHeader () {
  const { t } = useTranslation('header')
  const [sidebarOpened, setSidebarOpened] = useState(false)
  
  const handleSidebarHide = () => setSidebarOpened(false)
  const handleToggle = () => setSidebarOpened(true)

  return (
    <Media as={Sidebar.Pushable} at='mobile'>
      <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              inverted
              onHide={handleSidebarHide}
              vertical
              visible={sidebarOpened}
            >
             <Menu.Item as='a' active>
                <Image data-ft="logo" height={24} width={24} alt="logo" src="/images/logo.png" />
              </Menu.Item>
              <Menu.Item as='a'>{t("books")}</Menu.Item>
              <Menu.Item as='a'>{t("authors")}</Menu.Item>
              <Menu.Item as='a'>{t("categories")}</Menu.Item>
              <Menu.Item as='a'>{t("series")}</Menu.Item>
              <Menu.Item as='a'>{t("login")}</Menu.Item>
              <Menu.Item as='a'>{t("register")}</Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher dimmed={sidebarOpened}>
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <Button as='a' inverted >
                      {t("login")}
                      </Button>
                      <div style={{ marginLeft: '0.5em' }} />
                      <LanguageSwitcher />
                    </Menu.Item>
                  </Menu>
                </Container>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
    </Media>);
}

MobileHeader.propTypes = {
  children: PropTypes.node,
}

export default MobileHeader;