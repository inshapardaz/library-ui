import PropTypes from 'prop-types';

// Ui Library Imports
import Markdown from 'react-markdown'
import { ScrollArea } from '@mantine/core';
import classes from './scrollReader.module.css'
import { useLocalStorage } from '@mantine/hooks';

// Local Import
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

    return (
        <ScrollArea scrollbars="y" offsetScrollbars className={classes.scrollReader} style={{ fontFamily: readerFont, fontSize: readerFontSize }}>
            <Markdown>{markdown}</Markdown>
        </ScrollArea>)
}

ScrollReader.propTypes = {
    markdown: PropTypes.string
}

export default ScrollReader;