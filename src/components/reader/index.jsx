import { useRef, useState } from 'react';

// 3rd party libraries
import { Button, FloatButton, Skeleton, Watermark } from 'antd';
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
const Reader = ({ contents, loading, mode, t, font, size, lineHeight, hasPreviousChapter = false, onPreviousChapter = () => {}, hasNextChapter = false, onNextChapter = () => {} }) => {
    const ref = useRef(null);
    const [page, setPage] = useState(0)
    const pageWidth = ref.current ? ref.current.offsetWidth : 0

    if (loading) {
        return (<div className={styles.reader}>
            <div className={styles['reader__vertical']}>
                <Skeleton />
            </div>
        </div >)
    }

    const onPrevious = () => { 
        if (!canGoPrevious()) return false;
        
        setPage(page - 1)
        return true;
    }
    const canGoPrevious = () => {
        if (mode === 'vertical') return false;
        return page > 0 || hasPreviousChapter;

    }
    const onNext = () => {
        if (!canGoNext()) return false;

        setPage(page + 1)
        return true;
    }
    const canGoNext = () => {
        if (mode === 'vertical') return false;
        return hasNextChapter;
    }

    const left = `${pageWidth * page}px`;

    const className = `${styles.reader} ${styles[mode]}`

    const nextButton = canGoPrevious() ? (<Button className={`${styles['reader__nav']} ${styles['reader__nav--previous']}`} shape="circle" icon={<MdChevronLeft />} onClick={onPrevious} />) : null
    const previousButton = canGoNext() ? (<Button className={`${styles['reader__nav']} ${styles['reader__nav--next']}`} shape="circle" icon={<MdChevronRight />} onClick={onNext} />) : null


    return (
    <div className={className} data-ft="reader-layout">
        {previousButton}
        <div className={styles[`reader__container`]} ref={ref} data-ft="reader-container">
            <div className={styles[`reader__contents`]} style={{ fontFamily: font, fontSize: size, lineHeight: lineHeight, left: left }}>
                <Watermark content={t('app')} >
                    <ReactMarkdown children={contents} />
                </Watermark>
            </div>
        </div>
        {nextButton}
        <div className={styles[`reader__page-number`]}>{page + 1}</div>
        <FloatButton.BackTop />
    </div>)
        
}

export default Reader

