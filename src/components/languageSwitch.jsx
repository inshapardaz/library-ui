import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'

// UI Library
import { ActionIcon, Avatar, Button, Menu } from "@mantine/core";

// Local Import
import { languages, selectedLanguage, setLocale } from "@/store/slices/uiSlice";
import CountryFlag from './flags'
//----------------------------------

const LanguageSwitch = () => {
    const dispatch = useDispatch();
    const lang = useSelector(selectedLanguage);
    const { i18n } = useTranslation();

    const onLanguageSelected = (val) => {
        i18n.changeLanguage(val);
        dispatch(setLocale(val));
    }

    const avatar = (<Avatar radius="sm">{lang ? lang.key : '-'}</Avatar>);
    return (
        <>
            <Button.Group hiddenFrom="sm">
                {Object.values(languages).map(item =>
                    <Button
                        key={item.key}
                        variant={item?.key == lang?.key ? "transparent" : "default"}
                        onClick={() => onLanguageSelected(item.key)}
                    >
                        {item.name}
                    </Button>
                )}
            </Button.Group>
            <Menu shadow="md" width={200} visibleFrom="sm">
                <Menu.Target>
                    <ActionIcon variant="default" size="xl" aria-label="Select Language">
                        {avatar}
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    {Object.values(languages).map(item =>
                        <Menu.Item
                            key={item.key}
                            onClick={() => onLanguageSelected(item.key)}
                            leftSection={avatar}
                        >
                            {item.name}
                        </Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>
        </>
    );
}

export default LanguageSwitch;