import { useRef, useState } from 'react';

// 3rd party libraries
import { FloatButton, Skeleton, Watermark } from 'antd';
import ReactMarkdown from 'react-markdown'

// Local Imports
import styles from '../../styles/reader.module.scss'

//------------------------------------------------

// const ReaderMode = {
//   Vertical: 'vertical',
//   SinglePage: 'single-page',
//   FlipBook: 'flip-book'
// };

// 1. Mode  vertical or single-page or flip-book
const Reader = ({ contents, loading, mode, t, font, size, lineHeight }) => {
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
        return page > 0;

    }
    const onNext = () => {
        if (!canGoNext()) return false;

        setPage(page + 1)
        return true;
    }
    const canGoNext = () => {
        if (mode === 'vertical') return false;
        return true;
    }

    const left = `${pageWidth * page}px`;

    const className = `reader ${styles[`reader__${mode}`]}`

    console.log(pageWidth)
    return (
    <div className={className} data-ft="1">
        <button onClick={onPrevious} disabled={!canGoPrevious()} style={{ position: 'fixed', right: '0' }} type="button">previous</button>
        <div className={styles[`reader__${mode}--container`]} ref={ref}>
            <div className={styles[`reader__${mode}--contents`]} style={{ fontFamily: font, fontSize: size, lineHeight: lineHeight, left: left }}>
                <Watermark content={t('app')} >
                    <ReactMarkdown children={contents} />
                </Watermark>
                <FloatButton.BackTop />
            </div>
        </div>
        <div className={styles[`reader__${mode}--page-number`]}>{page + 1}</div>
        <button onClick={onNext} disabled={!canGoNext()} style={{ position: 'fixed', left: '0' }} type="button">next</button>
    </div>)
        
}

export default Reader

