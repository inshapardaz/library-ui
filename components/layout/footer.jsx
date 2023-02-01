import { useTranslations } from 'next-intl';

// 3rd party imports
import { Layout } from 'antd';
import LanguageSwitcher from "../languageSwitcher";
import styles from '../../styles/common.module.scss'

// ----------------------------------------------

function Footer({stickToBottom = false}) {
    const t = useTranslations();
    const contents = (<div className={styles.footer}>
        <div className={styles['footer__copyrights']}>{t('footer.copyrights')}</div>
        <div className={styles['footer__lang']} >
            <LanguageSwitcher openUp />
        </div>
    </div>)
    return (<Layout.Footer style={{ textAlign: 'center' }}>{contents}</Layout.Footer>)
}

export default Footer;