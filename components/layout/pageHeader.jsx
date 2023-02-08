import { useTranslations } from 'next-intl';

// 3rd party imports
import { Breadcrumb,  Col, Row, Typography, theme } from 'antd';
import { FaHome } from 'react-icons/fa';

// Local Imports
import styles from '@/styles/common.module.scss'

// ----------------------------------------------------

function PageHeader ({title, icon}) {
  const t = useTranslations();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (<div  className={styles.header}>
    <Row align="middle" gutter={8}>
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
    </Row>
  </div>);
}

export default PageHeader;