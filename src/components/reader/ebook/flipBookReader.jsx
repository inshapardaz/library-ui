import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown'

// Ui Library Imports
import { useInViewport, useHotkeys } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';

// Local Import
import classes from './flipBook.module.css'
import { IconLeft, IconRight } from '@/components/icon';
//---------------------------------

const FlipBookReader = ({ markdown, title, subTitle, canGoNext, onNext, canGoPrevious, onPrevious, layout = 'normal', showNavigation = true }) => {
    const readerFont = useSelector(state => state.ui.readerFont);
    const readerFontSize = useSelector(state => state.ui.readerFontSize);
    const readerLineHeight = useSelector(state => state.ui.readerLineHeight);

    const { ref, inViewport } = useInViewport();
    const [page, setPage] = useState(1);

    const pageWidth = 682;
    const left = useMemo(() => (page - 1) * pageWidth, [page]);

    const canGoNextPage = useMemo(() => !inViewport, [inViewport]);
    const canGoPreviousPage = useMemo(() => page > 1, [page]);

    const onNextPage = () => {
        if (canGoNextPage) {
            setPage(p => p + 1)
        } else if (canGoNext) {
            onNext();
        }
    }

    const onPreviousPage = () => {
        if (canGoPreviousPage) {
            setPage(p => p - 1)
        } else if (canGoPrevious) {
            onPrevious();
        }
    }

    useHotkeys([
        ['ArrowRight', () => onPreviousPage()],
        ['ArrowLeft', () => onNextPage()]
    ]);

    return (
        <div className={classes.container}>
            {showNavigation ? <div className={classes.navButton}>
                <ActionIcon hiddenFrom="sm" variant='default' size="lg" onClick={onPreviousPage} disabled={!canGoPreviousPage && !canGoPrevious}>
                    <IconRight />
                </ActionIcon>
            </div> : <span />}
            <div className={classes.readerPage} style={{
                fontFamily: readerFont,
                fontSize: readerFontSize,
                lineHeight: `${readerLineHeight}em`
            }}>
                <div className={`${classes.flipBookReader} readerLayout--${layout}`} >
                    <div className={classes.header}>
                        {title}
                    </div>
                    <div className={classes.readerContainer} style={{ left: `${left}px` }} >
                        <Markdown>{markdown}</Markdown>
                        <span ref={ref} />
                    </div>
                    <div className={classes.footer}>{subTitle}</div>
                </div>
            </div>
            {showNavigation ? <div className={classes.navButton}>
                <ActionIcon hiddenFrom="sm" variant='default' size="lg" onClick={onNextPage} disabled={!canGoNextPage && !canGoNext}>
                    <IconLeft />
                </ActionIcon>
            </div> : <span />}
        </div>)
}

FlipBookReader.propTypes = {
    markdown: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    layout: PropTypes.string,
    showNavigation: PropTypes.bool,
    canGoNext: PropTypes.bool,
    onNext: PropTypes.func,
    canGoPrevious: PropTypes.bool,
    onPrevious: PropTypes.func
}

export default FlipBookReader;