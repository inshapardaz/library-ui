import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Markdown from 'react-markdown'

// Ui Library Imports
import { useLocalStorage, useInViewport, useHotkeys } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';

// Local Import
import classes from './flipBook.module.css'
import themes from './themes.module.css'
import { IconLeft, IconRight } from '@/components/icon';

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

const FlipBookReader = ({ markdown, title, subTitle, canGoNext, onNext, canGoPrevious, onPrevious }) => {
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
            <div className={classes.navButton}>
                <ActionIcon variant='default' size="lg" onClick={onPreviousPage} disabled={!canGoPreviousPage && !canGoPrevious}>
                    <IconRight />
                </ActionIcon>
            </div>
            <div className={classes.readerPage} style={{
                fontFamily: readerFont,
                fontSize: readerFontSize
            }}>
                <div className={`${classes.flipBookReader} ${getThemeClass(readerTheme)}`} >
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
            <div className={classes.navButton}>
                <ActionIcon variant='default' size="lg" onClick={onNextPage} disabled={!canGoNextPage && !canGoNext}>
                    <IconLeft />
                </ActionIcon>
            </div>
        </div>)
}

FlipBookReader.propTypes = {
    markdown: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    canGoNext: PropTypes.bool,
    onNext: PropTypes.func,
    canGoPrevious: PropTypes.bool,
    onPrevious: PropTypes.func
}

export default FlipBookReader;