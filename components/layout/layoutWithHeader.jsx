// 3rd party libraries
import { Layout  } from "antd";

// Local imports
import Footer from "./footer";
import AppHeader from "./appHeader";
import styles from '../../styles/common.module.scss'

 // -----------------------------------------

function LayoutWithHeader({ children}) {
    return (
        <Layout>
            <AppHeader />
            <Layout.Content className={styles.contents} >
                    {children}
            </Layout.Content>
            <Footer/>
        </Layout>);
}

export default LayoutWithHeader;