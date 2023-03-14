import { useState } from 'react';

// 3rd party libraries
import { FloatButton, Skeleton, Watermark } from 'antd';
import ReactMarkdown from 'react-markdown'

// Local Imports
import styles from '../../styles/reader.module.scss'

//------------------------------------------------

const ReaderMode = {
  Vertical: 'vertical',
  SinglePage: 'single-page',
  FlipBook: 'flip-book'
};

// 1. Mode  vertical or single-page or flip-book
const Reader = ({ contents, loading, mode, t, font, size, lineHeight }) => {

    const [page, setPage] = useState(0)
    const pageWidth = 576

    if (loading) {
        return (<div className={styles.reader}>
            <div className={styles['reader__vertical']}>
                <Skeleton />
            </div>
        </div >)
    }

    const onPrevious = () => { 
        if (!canGoPrevious()) return false;

        return true;
    }
    const canGoPrevious = () => {
        if (mode === 'vertical') return false;
        return true;

    }
    const onNext = () => {
        if (!canGoNext()) return false;

        setPage(page+1)
        return true;
    }
    const canGoNext = () => {
        if (mode === 'vertical') return false;
        return true;
    }

    const left = `${pageWidth * page} px`;

    const className = `reader ${styles[`reader__${mode}`]}`
    console.log(left)
    return (
    <div className={className}>
        <button onClick={onNext} style={{ position: 'fixed', left: '0' }} type="button"> {page} next</button>
        <div className={styles[`reader__${mode}--container`]} >
            <div className={styles[`reader__${mode}--contents`]} style={{ fontFamily: font, fontSize: size, lineHeight: lineHeight, left }}>
                <Watermark content={t('app')} >
                    <ReactMarkdown children={contents} />
                </Watermark>
                <FloatButton.BackTop />
            </div>
        </div>
    </div>)
        
}

export default Reader

