import DesktopHeader from "./desktopHeader";
import DesktopFooter from "./desktopFooter";
import { Container } from "semantic-ui-react";

function LayoutWithHeader({ children}) {
    return (<>
        <DesktopHeader />
        <Container style={{ minHeight : 'calc(100vh - 109px)' }}>
            {children}
        </Container>
        <DesktopFooter/>
    </>);
}

export default LayoutWithHeader;