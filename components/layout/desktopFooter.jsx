import { useTranslation } from "react-i18next";

// 3rd party imports
import { Container, Menu } from "semantic-ui-react";

function DesktopFooter() {
    const { t } = useTranslation();
    return ( <Menu size='small' inverted>
        <Container>
            <Menu.Item>
                {/* {t('footer.copyrights')} */}
            </Menu.Item>
            <Menu.Item position='right'>
            
            </Menu.Item>
        </Container>
      </Menu>)
}

export default DesktopFooter;