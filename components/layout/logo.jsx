import Link from "next/link";
import { Space } from 'antd';
import styles from '@/styles/common.module.scss';
import Image from "next/image";

// ---------------------------------------------------
export function Logo({ t }) {
  return (<Link href="/" className={styles['header__logo']}>
    <Space size={8}>
      <Image src="/images/logo.png" alt="logo" height={24} width={24} />
      <span className={styles["header__logo-text"]}> {t("app")} </span>
    </Space>
  </Link>);
}
