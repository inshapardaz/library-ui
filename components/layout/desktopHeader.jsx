import PropTypes from 'prop-types'
import { Media } from './media'
import {
  Button,
  Container,
  Input,
  Menu,
  Visibility,
} from 'semantic-ui-react'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '../languageSwitcher'
import Image from 'next/image'
import { useState } from 'react'

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
                  <Button as='a' inverted={!fixed} >
                    {t("login")}
                  </Button>
                  <div style={{ marginLeft: '0.5em' }}/> 
                  <Button as='a' inverted={!fixed} primary={fixed}>
                    {t("register")}
                  </Button>
                  <div style={{ marginLeft: '0.5em' }}/> 
                  <LanguageSwitcher inverted={!fixed} />
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