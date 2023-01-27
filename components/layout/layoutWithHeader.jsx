// 3rd party libraries
import { Layout } from "antd";

// Local imports
import Footer from "./footer";
import AppHeader from "./appHeader";

 // -----------------------------------------

function LayoutWithHeader({ children}) {
    return (
        <Layout>
            <AppHeader />
            <Layout.Content style={{ minHeight : 'calc(100vh - 175px)' }}>
                {children}
            </Layout.Content>
            <Footer/>
        </Layout>);
}

export default LayoutWithHeader;