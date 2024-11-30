import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

// Ui Library import
import { ActionIcon, Drawer, Group, Paper, Select, Stack, Text } from "@mantine/core";

// Local Imports
import ReadViewToggle from "@/components/reader/readViewToggle";
import ReaderThemeSelector from "@/components/reader/readerThemeSelector";
import { getFonts } from '@/i18n';
import { setReaderFont, setReaderFontSize } from '@/store/slices/uiSlice';
//------------------------------

const ReaderSetting = ({ opened, onClose, language, showViews = true }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const readerFont = useSelector(state => state.ui.readerFont);
    const onReaderFontChanged = (value) => dispatch(setReaderFont(value))
    const readerFontSize = useSelector(state => state.ui.readerFontSize);

    const canIncreaseFont = () => parseInt(readerFontSize, 10) < 40;
    const increaseFont = () => {
        if (canIncreaseFont()) {
            dispatch(setReaderFontSize(parseInt(readerFontSize, 10) + 2));
        }
    }
    const canDecreaseFont = () => parseInt(readerFontSize, 10) > 10;
    const decreaseFont = () => {
        if (canDecreaseFont()) {
            dispatch(setReaderFontSize(parseInt(readerFontSize, 10) - 2));
        }
    }

    return (<Drawer opened={opened} onClose={onClose} title={t('book.chapters')}>
        <Stack>
            {showViews && <ReadViewToggle />}
            <Select data={getFonts(t, language)} value={readerFont} onChange={onReaderFontChanged} />
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
    opened: PropTypes.bool,
    onClose: PropTypes.func,
    showViews: PropTypes.bool,
}

export default ReaderSetting;