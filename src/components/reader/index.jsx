// 3rd party libraries
import { FloatButton, Watermark } from 'antd';
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
const Reader = ({ contents, mode, t, font, size }) => {

    if (mode === ReaderMode.SinglePage) {
    }

    if (mode === ReaderMode.FlipBook) {
    }

    return (<div className={styles.reader}>
        <div className={styles['reader__vertical']} style={{ fontFamily: font, fontSize: size }}>
            <Watermark content={t('app')} >
                <ReactMarkdown children={contents}/>
            </Watermark>
            <FloatButton.BackTop />
        </div>
    </div>)
        
}

export default Reader

