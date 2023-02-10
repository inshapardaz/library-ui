import { useLocalStorage } from "usehooks-ts";

import { Switch } from "antd";
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'

function DarkModeToggle() {
    const [mode, setMode] = useLocalStorage('ui-mode')
    const onClick = (checked) => {
        if (checked) {
            setMode('system');
        }
        else {
            setMode('dark');
        }
    }

    return (<Switch
        checkedChildren={<MdOutlineDarkMode />}
        unCheckedChildren={<MdOutlineWbSunny />}
        defaultChecked={mode === 'dark'}
        onChange={onClick}
    />);
}

export default DarkModeToggle;