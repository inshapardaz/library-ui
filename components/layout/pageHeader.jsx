import { useTranslations } from 'next-intl';

// 3rd party imports
import { Breadcrumb } from 'antd';

  
function PageHeader ({title, icon}) {
  const t = useTranslations();
  
    return (<Breadcrumb>
            <Breadcrumb.Item link>{t('home')}</Breadcrumb.Item>
            </Breadcrumb>);
}

export default PageHeader;