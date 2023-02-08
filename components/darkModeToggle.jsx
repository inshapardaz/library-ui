import { useLocalStorage } from "usehooks-ts";

import { Button, theme } from "antd";
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'

function DarkModeToggle() {
    const token = theme.useToken();
    const [mode, setMode] = useLocalStorage('ui-mode')
    const onClick = () => {
        switch (mode) {
            case 'light':
                setMode('dark');
                break;
            case 'dark':
                setMode('system');
                break;
            default:
                setMode('dark');
                break;
        }
    }
    const icon = mode === 'dark' ? <MdOutlineDarkMode /> :  <MdOutlineWbSunny />
    return <Button shape="circle" onClick={onClick} >
        { icon }
    </Button>
}

export default DarkModeToggle;