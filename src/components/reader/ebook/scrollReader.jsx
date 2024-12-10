import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux';

// Ui Library Imports
import { ActionIcon, useDirection } from '@mantine/core';

// Local imports
import classes from './scrollReader.module.css'
import { IconLeft, IconRight } from '@/components/icon';

// Local Import
import useTouchSlide from '@/hooks/useTouchSlide';
import If from '@/components/if';
//---------------------------------

const ScrollReader = ({ title, markdown, canGoNext, onNext, canGoPrevious, onPrevious, showNavigation = true, direction = 'rtl' }) => {
    const readerFont = useSelector(state => state.ui.readerFont);
    const readerFontSize = useSelector(state => state.ui.readerFontSize);
    const readerLineHeight = useSelector(state => state.ui.readerLineHeight);
    const { dir } = useDirection();
    const finalDirection = useMemo(() => direction ? direction : dir, [dir, direction]);

    const onNavigateLeft = () => {
        finalDirection == "rtl" ? onNext() : onPrevious()
    }

    const onNavigateRight = () => {
        finalDirection == "rtl" ? onPrevious() : onNext()
    }

    const dragRef = useRef(null);
    useTouchSlide({
        ref: dragRef,
        onSlideLeft: onNavigateLeft,
        onSlideRight: onNavigateRight
    });

    return (
        <div className={`${classes.scrollReader} ${showNavigation ? classes.scrollReaderShowNavigation : classes.scrollReaderNoNavigation}`}>
            <If condition={showNavigation}>
                <ActionIcon variant='default' size="lg" className={classes.navButton} disabled={!canGoPrevious} onClick={onPrevious}>
                    <IconRight />
                </ActionIcon>
            </If>
            <div className={classes.readerWrapper} style={{ fontFamily: readerFont, fontSize: `${readerFontSize}px` }} ref={dragRef}>
                <div className={classes.readerContainer} style={{ fontFamily: readerFont, fontSize: `${readerFontSize}px`, lineHeight: `${readerLineHeight}em` }}>
                    <div className={classes.header}>
                        {title}
                    </div>
                    <Markdown>{markdown}</Markdown>
                </div>
            </div>
            <If condition={showNavigation}>
                <ActionIcon variant='default' size="lg" className={classes.navButton} disabled={!canGoNext} onClick={onNext}>
                    <IconLeft />
                </ActionIcon>
            </If>
        </div>)
}

ScrollReader.propTypes = {
    title: PropTypes.string,
    markdown: PropTypes.string,
    showNavigation: PropTypes.bool,
    canGoNext: PropTypes.bool,
    onNext: PropTypes.func,
    canGoPrevious: PropTypes.bool,
    onPrevious: PropTypes.func,
    direction: PropTypes.string,
}

export default ScrollReader;