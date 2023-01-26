import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/common.module.scss'

// ----------------------------------------------

function FullPageFormContainer ({title, children}) {
    const { t } = useTranslation('common')

    return (<div className={styles['fullPage_layout']}>
      <div className={styles['fullPage_layout__image']}></div>
      <div className={styles['fullPage_layout__form']}>
        <div className={styles['fullPage_layout__logo']}>
            <Image src='/images/logo.png' alt={t("app")} height={40} width={40}/>
        </div>
        <span className={styles['fullPage_layout__title']}>{title}</span>
        {children}
      </div>
    </div>)
}

export default FullPageFormContainer;