import { useEffect, useState } from "react";

import { Button } from "antd";
import { MdOutlineSettingsBrightness, MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'


function DarkModeToggle() {
    const [mode, setMode] = useState('light')

    useEffect(() => {
        setMode(localStorage.getItem('ui-mode') ?? 'light');
      }, [])

      
    const saveUiMode = (newMode) => {
        setMode(newMode);
        localStorage.setItem('ui-mode', newMode);
    }
    const onClick = () => {
        switch (mode) {
            case 'light':
                saveUiMode('dark');
                break;
            case 'dark':
                saveUiMode('system');
                break;
            case 'system':
                saveUiMode('light');
                break;
            default:
                saveUiMode('dark');
                break;
        }
    }
    const icon = mode === 'dark' ? <MdOutlineDarkMode /> : mode === 'light' ? <MdOutlineWbSunny /> : <MdOutlineSettingsBrightness />
    return <Button shape="circle" ghost onClick={onClick}>
        { icon }
    </Button>
}

export default DarkModeToggle;