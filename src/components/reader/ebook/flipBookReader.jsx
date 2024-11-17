import PropTypes from 'prop-types';

// Ui Library Imports
import Markdown from 'react-markdown'
import { ScrollArea } from '@mantine/core';

// Local Import
//---------------------------------

const FlipBookReader = ({ markdown }) => {

    return (
        <ScrollArea scrollbars="x">
            <Markdown>{markdown}</Markdown>
        </ScrollArea>)

}

FlipBookReader.propTypes = {
    markdown: PropTypes.string
}

export default FlipBookReader;