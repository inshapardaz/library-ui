
import { useEffect, useState } from "react";

// 3rd party imports
import { Switch } from "antd";
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'

// Local imports
import { useThemeContext } from '@/helpers/theme.context';

// -------------------------------------------------

function DarkModeToggle() {
    const { darkMode, setThemeMode } = useThemeContext()

    return (<Switch
        checkedChildren={<MdOutlineDarkMode />}
        unCheckedChildren={<MdOutlineWbSunny />}
        checked={darkMode}
        onChange={setThemeMode}
    />);
}

export default DarkModeToggle;