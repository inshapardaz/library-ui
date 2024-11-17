import PropTypes from 'prop-types';

// Ui Library Imports
import Markdown from 'react-markdown'
import { ScrollArea } from '@mantine/core';

// Local Import
//---------------------------------

const ScrollReader = ({ markdown }) => {
    return (
        <ScrollArea scrollbars="y" >
            <Markdown>{markdown}</Markdown>
        </ScrollArea>)
}

ScrollReader.propTypes = {
    markdown: PropTypes.string
}

export default ScrollReader;