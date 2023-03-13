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

    if (mode === ReaderMode.SinglePage) {
    }

    if (mode === ReaderMode.FlipBook) {
    }

    if (loading) {
        return (<div className={styles.reader}>
            <div className={styles['reader__vertical']}>
                <Skeleton />
            </div>
        </div >)
    }

    return (
    <div className={styles[`reader__${mode}`]}>
        <div className={styles[`reader__${mode}--contents`]} style={{ fontFamily: font, fontSize: size, lineHeight: lineHeight }}>
            <Watermark content={t('app')} >
                <ReactMarkdown children={contents} />
            </Watermark>
            <FloatButton.BackTop />
        </div>
    </div>)
        
}

export default Reader

