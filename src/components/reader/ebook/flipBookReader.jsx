import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown'

// Ui Library Imports
import { useInViewport, useHotkeys, useViewportSize } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';

// Local Import
import classes from './flipBook.module.css'
import { IconLeft, IconRight } from '@/components/icon';
//---------------------------------

const FlipBookReader = ({ markdown, canGoNext, onNext, canGoPrevious, onPrevious, showNavigation = true, pagesToShow = 1 }) => {
    const readerFont = useSelector(state => state.ui.readerFont);
    const readerFontSize = useSelector(state => state.ui.readerFontSize);
    const readerLineHeight = useSelector(state => state.ui.readerLineHeight);

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const { ref, inViewport } = useInViewport();
    const { width } = useViewportSize();
    const [page, setPage] = useState(1);

    const pages = useMemo(() => width < 1440 ? 1 : pagesToShow, [pagesToShow, width]);
    const containerClass = useMemo(() => pages === 2 ? classes.readerContainerDouble : classes.readerContainerSingle, [pages]);
    const readerLayoutClass = useMemo(() => pages === 2 ? classes.flipBookReaderDouble : classes.flipBookReaderSingle, [pages]);

    const pageWidth = 682;
    const left = useMemo(() => {
        if (pages == 2) {
            return (page - 1) * (pageWidth * 2 - 32);
        }

        return (page - 1) * pageWidth;
    }, [page, pages]);

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

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 100) {
            onPreviousPage();
        }

        if (touchStart - touchEnd < -100) {
            onNextPage();
        }
    };


    useHotkeys([
        ['ArrowRight', () => onPreviousPage()],
        ['ArrowLeft', () => onNextPage()]
    ]);

    return (
        <div className={classes.container} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {showNavigation ? <div className={classes.navButton}>
                <ActionIcon visibleFrom="md" variant='default' size="lg" onClick={onPreviousPage} disabled={!canGoPreviousPage && !canGoPrevious}>
                    <IconRight />
                </ActionIcon>
            </div> : <span />}
            <div className={`${classes.flipBookReader} ${readerLayoutClass}`} style={{
                fontFamily: readerFont,
                fontSize: readerFontSize,
                lineHeight: `${readerLineHeight}em`
            }}>
                <div className={`${classes.readerContainer} ${containerClass}`} style={{ left: `${left}px` }} >
                    <Markdown>{markdown}</Markdown>
                    <span ref={ref} />
                </div>
            </div>
            {showNavigation ? <div className={classes.navButton}>
                <ActionIcon visibleFrom="md" variant='default' size="lg" onClick={onNextPage} disabled={!canGoNextPage && !canGoNext}>
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
    onPrevious: PropTypes.func,
    pagesToShow: PropTypes.number
}

export default FlipBookReader;