import DesktopHeader from "./desktopHeader";
import DesktopFooter from "./desktopFooter";
import { Container } from "semantic-ui-react";

function LayoutWithHeader({ children}) {
    return (<>
        <DesktopHeader />
        <Container>
            {children}
        </Container>
        <DesktopFooter/>
    </>);
}

export default LayoutWithHeader;