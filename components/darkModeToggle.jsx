
// 3rd party imports
import { Switch } from "antd";
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'

// Local imports
import { useThemeContext } from '@/helpers/theme.context';

// -------------------------------------------------

function DarkModeToggle() {
    const { currentTheme, setDarkMode } = useThemeContext()

    return (<Switch
        checkedChildren={<MdOutlineDarkMode />}
        unCheckedChildren={<MdOutlineWbSunny />}
        checked={currentTheme.darkMode}
        onChange={setDarkMode}
    />);
}

export default DarkModeToggle;