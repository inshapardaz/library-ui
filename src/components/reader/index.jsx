import { useEffect, useRef, useState } from 'react';

// 3rd party libraries
import { Button, FloatButton, Skeleton } from 'antd';
import ReactMarkdown from 'react-markdown'

// Local Imports
import styles from '../../styles/reader.module.scss'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

//------------------------------------------------

// const ReaderMode = {
//   Vertical: 'vertical',
//   SinglePage: 'single-page',
//   FlipBook: 'flip-book'
// };

// 1. Mode  vertical or single-page or flip-book
const Reader = ({ contents, loading, mode, font, size, lineHeight, hasPreviousChapter = false, onPreviousChapter = () => {}, hasNextChapter = false, onNextChapter = () => {} }) => {
    const ref = useRef(null);
    const refContents = useRef(null);
    const [progress, setProgress] = useState(0)
    const pageWidth = ref.current ? ref.current.offsetWidth + 24 : 0
    const contentWidth = refContents.current ? refContents.current.scrollWidth : 0;
    const pageCount = Math.round(contentWidth > 0 ? contentWidth / pageWidth : 0);

    console.log(`contentWidth : ${contentWidth}`)
    useEffect(() => {
        setProgress(0)
    }, [mode, contents])

    // if (loading) {
    //     return (<div className={styles.reader}>
    //         <div className={styles['reader__vertical']}>
    //             <Skeleton />
    //         </div>
    //     </div >)
    // }

    const onPrevious = () => { 
        if (progress <= 0 && hasPreviousChapter) 
        {
            onPreviousChapter()
            return true;
        }

        if (!canGoPrevious()) return false;
        
        setProgress(progress - 1)
        return true;
    }
    const canGoPrevious = () => {
        if (mode === 'vertical') return false;
        return progress > 0 || hasPreviousChapter;

    }
    const onNext = () => {
        if (progress >= pageCount - 1 && hasNextChapter) 
        {
            onNextChapter()
            return true;
        }

        if (!canGoNext()) return false;

        setProgress(progress + 1)
        return true;
    }
    const canGoNext = () => {
        if (mode === 'vertical') return false;
        return progress < pageCount - 1 || hasNextChapter; 
    }

    const left = `${pageWidth * progress}px`;

    const className = `${styles.reader} ${styles[mode]}`

    const previousButton = canGoPrevious() ? (<Button className={`${styles['reader__nav']} ${styles['reader__page-number--previous']}`} data-ft="nextButton" shape="circle" icon={<MdChevronRight />} onClick={onPrevious} />) : null
    const nextButton = canGoNext() ? (<Button className={`${styles['reader__nav']} ${styles['reader__page-number--next']}`} data-ft="previousButton" shape="circle" icon={<MdChevronLeft />} onClick={onNext} />) : null


    return (
    <div className={className} data-ft="reader-layout">
        {previousButton}
        <div className={styles[`reader__container`]} ref={ref} data-ft="reader-container" >
            <div className={styles[`reader__page`]} style={{ left: left }}>
                    <div className={styles[`reader__contents`]} ref={refContents} style={{ fontFamily: font, fontSize: size, lineHeight: lineHeight }}>
                        { loading ? <Skeleton /> : <ReactMarkdown children={contents} />}
                </div>
            </div>
                <div className={styles[`reader__page-number`]}>{progress + 1} / { pageCount }</div>
        </div>
        {nextButton}
        <FloatButton.BackTop />
    </div>)
        
}

export default Reader

