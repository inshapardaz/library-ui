import DesktopHeader from "./desktopHeader";
import DesktopFooter from "./desktopFooter";

function LayoutWithHeader({ children}) {
    return (<>
        <DesktopHeader />
        {children}
        <DesktopFooter/>
    </>);
}

export default LayoutWithHeader;