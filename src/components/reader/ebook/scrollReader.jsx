import PropTypes from 'prop-types';
import Markdown from 'react-markdown'

// Ui Library Imports
import { ActionIcon } from '@mantine/core';

// Local imports
import classes from './scrollReader.module.css'
import { IconLeft, IconRight } from '@/components/icon';
import { useSelector } from 'react-redux';

// Local Import
//---------------------------------

const ScrollReader = ({ title, markdown, canGoNext, onNext, canGoPrevious, onPrevious, layout = 'normal', showNavigation = true }) => {
    const readerFont = useSelector(state => state.ui.readerFont);
    const readerFontSize = useSelector(state => state.ui.readerFontSize);

    console.log('readerFontSize', readerFontSize)

    return (
        <div className={`${classes.scrollReader} readerLayout--${layout}`}>
            {showNavigation ? <ActionIcon variant='default' size="lg" className={classes.navButton} disabled={!canGoPrevious} onClick={onPrevious}>
                <IconRight />
            </ActionIcon> : <span />}
            <div className={classes.readerWrapper} style={{ fontFamily: readerFont, fontSize: `${readerFontSize}px` }}>
                <div className={classes.readerContainer} style={{ fontFamily: readerFont, fontSize: `${readerFontSize}px` }}>
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