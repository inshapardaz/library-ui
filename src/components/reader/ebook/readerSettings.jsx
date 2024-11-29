import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

// Ui Library import
import { ActionIcon, Drawer, Group, Paper, Select, Stack, Text } from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';

// Local Imports
import ReadViewToggle from "@/components/reader/readViewToggle";
import ReaderThemeSelector from "@/components/reader/readerThemeSelector";
import { getFonts } from '@/i18n';
//------------------------------

const ReaderSetting = ({ opened, onClose, language }) => {
    const { t } = useTranslation();

    const [readerFont, setReaderFont] = useLocalStorage({
        key: "reader-font",
        defaultValue: 'scroll',
    });

    const [readerFontSize, setReaderFontSize] = useLocalStorage({
        key: "reader-font-size",
        defaultValue: 16,
    });

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

    return (<Drawer opened={opened} onClose={onClose} title={t('book.chapters')}>
        <Stack>
            <ReadViewToggle />
            <Select data={getFonts(t, language)} value={readerFont} onChange={setReaderFont} />
            <ReaderThemeSelector />
            <Paper withBorder >
                <Group justify="space-between">
                    <ActionIcon variant='default' size='xl' disabled={!canIncreaseFont()} onClick={increaseFont}>+</ActionIcon>
                    <Text>{readerFontSize}</Text>
                    <ActionIcon variant='default' size='xl' disabled={!canDecreaseFont()} onClick={decreaseFont} >-</ActionIcon>
                </Group>
            </Paper>
        </Stack>
    </Drawer>);
};

ReaderSetting.propTypes = {
    language: PropTypes.string,
    opened: PropTypes.string,
    onClose: PropTypes.func
}

export default ReaderSetting;