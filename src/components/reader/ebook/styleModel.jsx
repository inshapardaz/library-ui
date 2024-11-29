import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// 3rd party imprts
import { ActionIcon, Group, Paper, Select, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

// Local Import
import ReadViewToggle from "@/components/reader/readViewToggle";
import { getFonts } from '@/i18n';
//----------------------------------------
const StyleModel = ({ language = "ur" }) => {
    const { t } = useTranslation();

    const [readerView, setReaderView] = useLocalStorage({
        key: "reader-view-type",
        defaultValue: 'scroll',
    });

    const [readerFont, setReaderFont] = useLocalStorage({
        key: "reader-font",
        defaultValue: 'scroll',
    });

    const [readerFontSize, setReaderFontSize] = useLocalStorage({
        key: "reader-font-size",
        defaultValue: 16,
    });

    const [readerTheme, setReaderTheme] = useLocalStorage({
        key: "reader-theme",
        defaultValue: 'White',
    });

    const themes = [
        { value: "White", label: t('reader.theme.white') },
        { value: "Dark", label: t('reader.theme.dark') },
        { value: "Sepia", label: t('reader.theme.sepia') },
        { value: "Grey", label: t('reader.theme.grey') },
    ];

    const canIncreaseFont = () => parseInt(readerFontSize, 10) < 40;
    const increaseFont = () => {
        if (canIncreaseFont()) {
            setReaderFontSize(parseInt(readerFontSize, 10) + 2);
        }
    }
    const canDecreaseFont = () => parseInt(readerFontSize, 10) > 10;
    const decreaseFont = () => {
        if (canDecreaseFont()) {
            setReaderFontSize(parseInt(readerFontSize, 10) - 2)
        }
    }

    return (<Group>
        <ReadViewToggle value={readerView} onChange={setReaderView} />
        <Select data={getFonts(t, language)} value={readerFont} onChange={setReaderFont} />
        <Select data={themes} value={readerTheme} onChange={setReaderTheme} />
        <Paper withBorder >
            <Group>
                <ActionIcon variant='default' disabled={!canIncreaseFont()} onClick={increaseFont}>+</ActionIcon>
                <Text>{readerFontSize}</Text>
                <ActionIcon variant='default' disabled={!canDecreaseFont()} onClick={decreaseFont} >-</ActionIcon>
            </Group>
        </Paper>
    </Group>);
}

StyleModel.propTypes = {
    language: PropTypes.string
}

export default StyleModel;