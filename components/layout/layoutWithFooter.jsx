import { Layout } from "antd";
import React from "react";

// local imports
import Footer from "./footer";
// -----------------------------------

const LayoutWithFooter = ({ children }) => {
    return <Layout>
                {children}
                <Footer stickToBottom />
            </Layout>;
}

export default LayoutWithFooter;