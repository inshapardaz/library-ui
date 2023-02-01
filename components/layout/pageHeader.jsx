import { useTranslations } from 'next-intl';

// 3rd party imports
import { Icon, Menu, Breadcrumb } from "semantic-ui-react";

  
function PageHeader ({title, icon}) {
  const t = useTranslations();
  
    return (<Menu secondary>
        <Menu.Item>
            <Icon name={icon} size='large'/>
        </Menu.Item>
        <Menu.Item>
            <h4>{title}</h4>
        </Menu.Item>
        <Menu.Item position="right">
            <Breadcrumb>
            <Breadcrumb.Section link>{t('home')}</Breadcrumb.Section>
            </Breadcrumb>
        </Menu.Item>
        </Menu>)
}

export default PageHeader;