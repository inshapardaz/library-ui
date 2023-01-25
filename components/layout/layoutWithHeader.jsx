import DesktopHeader from "./desktopHeader";
import Footer from "./footer";
import { Container } from "semantic-ui-react";

function LayoutWithHeader({ children}) {
    return (<>
        <DesktopHeader />
        <Container style={{ minHeight : 'calc(100vh - 109px)' }}>
            {children}
        </Container>
        <Footer/>
    </>);
}

export default LayoutWithHeader;