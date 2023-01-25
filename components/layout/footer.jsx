import { useTranslation } from "react-i18next";

// 3rd party imports
import { Layout } from 'antd';
import LanguageSwitcher from "../languageSwitcher";
import styles from '../../styles/Home.module.scss'

// ----------------------------------------------

function Footer({stickToBottom = false}) {
    const { t } = useTranslation();
    const contents = (<div className={styles.footer}>
        <div className={styles.copyrights}>{t('footer.copyrights')}</div>
        <LanguageSwitcher />
    </div>)
    return (<Layout.Footer style={{ textAlign: 'center' }}>{contents}</Layout.Footer>)
}

export default Footer;