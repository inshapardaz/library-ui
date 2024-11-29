
// Ui Library Imports
import { ColorSwatch, SegmentedControl, Stack } from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';
import { useTranslation } from "react-i18next";

// Local imports
//-----------------------------------
const ReaderThemeSelector = () => {
    const { t } = useTranslation();

    const [readerTheme, setReaderTheme] = useLocalStorage({
        key: "reader-theme",
        defaultValue: 'White',
    });

    const themes = [{
        value: "White",
        label: (<Stack align="center">
            <ColorSwatch color="var(--reader-theme-white-background)" />
            {t('reader.theme.white')}
        </Stack>)
    }, {
        value: "Dark",
        label: (<Stack align="center">
            <ColorSwatch color="var(--reader-theme-dark-background)" />
            {t('reader.theme.dark')}
        </Stack>)
    }, {
        value: "Sepia",
        label: (<Stack align="center">
            <ColorSwatch color="var(--reader-theme-sepia-background)" />
            {t('reader.theme.sepia')}
        </Stack>)
    }, {
        value: "Grey",
        label: (<Stack align="center">
            <ColorSwatch color="var(--reader-theme-grey-background)" />
            {t('reader.theme.grey')}
        </Stack>)
    }];

    return <SegmentedControl size="md" onChange={setReaderTheme} value={readerTheme} data={themes} />
}

export default ReaderThemeSelector;