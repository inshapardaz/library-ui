import { useTranslations } from 'next-intl';

// 3rd party imports
import { Breadcrumb,  Col, Row, Typography, theme } from 'antd';
import { FaHome } from 'react-icons/fa';
  
function PageHeader ({title, icon}) {
  const t = useTranslations();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (<Row align="middle" gutter={4} style={{ margin: '16px 0', backgroundColor: 'transparent' }}>
    <Col>{icon}</Col>
    <Col flex="auto">
      <Typography.Title level={2}>{title}</Typography.Title>
    </Col>
    <Col>
      <Breadcrumb>
          <Breadcrumb.Item href="/">
          <FaHome />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('libraries.title')}</Breadcrumb.Item>
      </Breadcrumb>
    </Col>
  </Row>);
}

export default PageHeader;