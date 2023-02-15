
import { useEffect, useState } from "react";
import { Switch } from "antd";
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'

function DarkModeToggle() {
    const [mode, setMode] = useState('light')

    useEffect(() =>  {
        setMode (localStorage.getItem('ui-mode'))
      }, [])

      console.log(mode)

    const onClick = (checked) => {
        if (checked) {
            setMode('dark');
            localStorage.setItem('ui-mode', 'dark')
        }
        else {
            setMode('light');
            localStorage.setItem('ui-mode', 'light')
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