import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Markdown from 'react-markdown'

// Ui Library Imports
import { useLocalStorage, useElementSize, useInViewport } from '@mantine/hooks';
import { ActionIcon } from '@mantine/core';

// Local Import
import classes from './flipBook.module.css'
import themes from './themes.module.css'
import { IconLeft, IconRight } from '@/components/icon';

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

const FlipBookReader = ({ markdown, title, subTitle }) => {
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

    const { ref, width } = useElementSize();
    const { ref: ref2, inViewport } = useInViewport();
    const [page, setPage] = useState(1);

    const pageWidth = 682;
    const left = useMemo(() => (page - 1) * pageWidth, [page]);

    const canGoNext = useMemo(() => !inViewport, [inViewport]);
    const canGoPrevious = useMemo(() => page > 1, [page]);

    const onNext = () => {
        console.log('onNext')
        if (canGoNext) {
            setPage(p => p + 1)
        }
    }

    const onPrevious = () => {
        console.log('onPrevious')
        if (canGoPrevious) {
            setPage(p => p - 1)
        }
    }


    console.log({
        page,
        width,
        canGoNext,
        canGoPrevious,
        left,
        inViewport
    })
    return (
        <div className={classes.container}>
            <div className={classes.navButton}>
                <ActionIcon variant='default' size="lg" onClick={onPrevious} disabled={!canGoPrevious}>
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
                    <div className={classes.readerContainer} style={{ left: `${left}px` }} ref={ref}>
                        <Markdown>{markdown}</Markdown>
                        <span ref={ref2} />
                    </div>
                    <div className={classes.footer}>{subTitle}</div>
                </div>
            </div>
            <div className={classes.navButton}>
                <ActionIcon variant='default' size="lg" onClick={onNext} disabled={!canGoNext}>
                    <IconLeft />
                </ActionIcon>
            </div>
        </div>)
}

FlipBookReader.propTypes = {
    markdown: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string
}

export default FlipBookReader;