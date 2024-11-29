import PropTypes from 'prop-types';
import Markdown from 'react-markdown'

// Ui Library Imports

import { useLocalStorage } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';

// Local imports
import classes from './scrollReader.module.css'
import themes from './themes.module.css'
import { IconLeft, IconRight } from '@/components/icon';

// Local Import
//---------------------------------

const getThemeClass = (theme) => {
    switch (theme) {
        case 'White':
            return themes.markdownReaderThemeWhite;
        case 'Dark':
            return themes.markdownReaderThemeDark;
        case 'Sepia':
            return themes.markdownReaderThemeSepia;
        case 'Grey':
            return themes.markdownReaderThemeGrey;
        default:
            return '';
    }
}

//---------------------------------

const ScrollReader = ({ title, markdown, canGoNext, onNext, canGoPrevious, onPrevious, layout = 'normal', showNavigation = true }) => {
    const [readerFont] = useLocalStorage({
        key: "reader-font",
        defaultValue: '',
    });

    const [readerFontSize] = useLocalStorage({
        key: "reader-font-size",
        defaultValue: 16,
    });

    const [readerTheme] = useLocalStorage({
        key: "reader-theme",
        defaultValue: 'white',
    });

    return (
        <div className={`${classes.scrollReader} ${getThemeClass(readerTheme)} readerLayout--${layout}`}>
            {showNavigation ? <ActionIcon variant='default' size="lg" className={classes.navButton} disabled={!canGoPrevious} onClick={onPrevious}>
                <IconRight />
            </ActionIcon> : <span />}
            <div className={classes.readerWrapper} style={{ fontFamily: readerFont, fontSize: readerFontSize }}>
                <div className={classes.readerContainer} style={{ fontFamily: readerFont, fontSize: readerFontSize }}>
                    <div className={classes.header}>
                        {title}
                    </div>
                    <Markdown>{markdown}</Markdown>
                </div>
            </div>
            {showNavigation ? <ActionIcon variant='default' size="lg" className={classes.navButton} disabled={!canGoNext} onClick={onNext}>
                <IconLeft />
            </ActionIcon> : <span />}
        </div>)
}

ScrollReader.propTypes = {
    title: PropTypes.string,
    markdown: PropTypes.string,
    showNavigation: PropTypes.bool,
    layout: PropTypes.string,
    canGoNext: PropTypes.bool,
    onNext: PropTypes.func,
    canGoPrevious: PropTypes.bool,
    onPrevious: PropTypes.func
}

export default ScrollReader;