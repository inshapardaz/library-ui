
import { useDispatch, useSelector } from "react-redux";

// 3rd party imports
import { Switch } from "antd";
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'

// Local imports
import { uiMode, toggleUiMode } from '../features/ui/uiSlice';

// -------------------------------------------------

function DarkModeToggle() {
    const dispatch = useDispatch();
    const mode = useSelector(uiMode);
    const toggleDarkMode = () => dispatch(toggleUiMode())
    
    return (<Switch
        checkedChildren={<MdOutlineDarkMode />}
        unCheckedChildren={<MdOutlineWbSunny />}
        checked={mode === 'dark'}
        onChange={toggleDarkMode}
    />);
}

export default DarkModeToggle;