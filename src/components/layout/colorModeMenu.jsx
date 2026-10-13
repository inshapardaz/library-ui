import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { ActionIcon, Menu, useMantineColorScheme } from '@mantine/core';

// Local Imports
import { IconCheck, IconMoon, IconMonitor, IconSun } from '@/components/icon';
//----------------------------------------------

const MODES = [
    { value: 'light', icon: IconSun },
    { value: 'dark', icon: IconMoon },
    { value: 'auto', icon: IconMonitor },
];

const LABEL_KEYS = { light: 'appearance.light', dark: 'appearance.dark', auto: 'appearance.system' };

// Light, dark or follow the system. Mantine keeps the choice in local storage and applies it
// before first paint.
const ColorModeMenu = () => {
    const { t } = useTranslation();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const Current = MODES.find((mode) => mode.value === colorScheme)?.icon ?? IconMonitor;

    return (
        <Menu position="bottom-end" withinPortal>
            <Menu.Target>
                <ActionIcon variant="subtle" size="lg" aria-label={t('appearance.mode')}>
                    <Current height={20} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {MODES.map(({ value, icon: Icon }) => (
                    <Menu.Item
                        key={value}
                        leftSection={<Icon height={16} />}
                        rightSection={colorScheme === value ? <IconCheck height={14} /> : null}
                        onClick={() => setColorScheme(value)}
                        fw={colorScheme === value ? 600 : 400}
                    >
                        {t(LABEL_KEYS[value])}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default ColorModeMenu;
