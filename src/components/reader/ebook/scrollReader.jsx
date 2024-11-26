import PropTypes from 'prop-types';

// Ui Library Imports
import Markdown from 'react-markdown'
import classes from './scrollReader.module.css'
import themes from './themes.module.css'

import { useLocalStorage } from '@mantine/hooks';
import { Button } from '@mantine/core';

// Local Import
//---------------------------------

const getThemeClass = (theme) => {
    console.log(theme)
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

const ScrollReader = ({ markdown }) => {
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
        <div className={`${classes.scrollReader} ${getThemeClass(readerTheme)}`}>
            <Button>Next</Button>
            <div className={classes.readerContainer} style={{ fontFamily: readerFont, fontSize: readerFontSize }}>
                <Markdown>{markdown}</Markdown>
            </div>
            <Button>Previous</Button>
        </div>)
}

ScrollReader.propTypes = {
    markdown: PropTypes.string
}

export default ScrollReader;