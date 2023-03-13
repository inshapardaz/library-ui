import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";

// 3rd party libraries
import { useLocalStorage } from "usehooks-ts";
import { Layout , Drawer, Row, Col,  Divider, Typography, Slider, Segmented, theme, Button, Tooltip, Affix } from 'antd';
import { ImMenu4, ImFileText2 } from 'react-icons/im'
import { IoIosCloseCircle } from 'react-icons/io'
import { BsFileEarmarkFont } from 'react-icons/bs'
import { MdSettings, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { TiDocumentText } from 'react-icons/ti'
import { VscBook } from 'react-icons/vsc'

// Local imports
import styles from '../../styles/reader.module.scss'
import { selectedLanguage } from '../../features/ui/uiSlice';
import { useGetBookQuery, useGetChapterQuery, useGetChapterContentsQuery } from "../../features/api/booksSlice"
import { languages } from '../../features/ui/uiSlice';
import Reader from "../../components/reader";
import FontList from "../../components/reader/fontList";
import ChaptersMenu from "../../components/books/chapters/chaptersMenu";
//------------------------------------------------

const { Header, Content, Footer } = Layout;

//------------------------------------------------


    const readerViews = [{
        value: 'vertical',
        icon: <TiDocumentText />
    }, {
        value: 'singlePage',
        icon: <ImFileText2 />
    }, {
            value: 'flipBook',
        icon: <VscBook />
    }];

// ------------------------------------------------------

const BookReader = () => {
    const { t } = useTranslation()
    const {
    token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()
    const lang = useSelector(selectedLanguage)
    const { libraryId, bookId, chapterId } = useParams()
    const { data: book, error: bookError } = useGetBookQuery({libraryId, bookId}, { skip : !libraryId || !bookId })
    const { data : chapter, error: chapterError } = useGetChapterQuery({libraryId, bookId, chapterId}, { skip : !libraryId || !bookId || !chapterId || !book || bookError })
    const { data : contents, error: contentsError, isFetching: contentsFetching } = useGetChapterContentsQuery({libraryId, bookId, chapterId}, { skip : !libraryId || !bookId || !chapterId || !chapter || chapterError })
    
    const [font, setFont] = useLocalStorage('reader-font', 'MehrNastaleeq')
    const [size, setSize] = useLocalStorage('reader-font-size', 2.0);
    const [lineHeight, setLineHeight] = useLocalStorage('reader-line-height', 1.5);
    const [view, setView] = useLocalStorage('reader-view', 'vertical');
    
    const [showChapters, setShowChapters] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const openSettings = () => setShowSetting(true)
    const onCloseSettings = () => setShowSetting(false)
    
    const openChapters = () => setShowChapters(true)
    const onCloseChapters = () => setShowChapters(false)
    const getDirection = () => languages[contents?.language]?.dir ?? lang.dir
    const onClose = () => navigate(`/libraries/${libraryId}/books/${bookId}`)
    const gotoChapter = (chapterNumber) => navigate(`/libraries/${libraryId}/books/${bookId}/chapters/${chapterNumber}`)
    const onNext = () => gotoChapter(chapter?.chapterNumber+1)
    const onPrevious = () => gotoChapter(chapter?.chapterNumber-1)

    useEffect(() => {
        if (contentsError && contentsError.status === 401)
        {
            navigate('/403')
        }

        if (bookError || chapterError || contentsError) {
            navigate('/500')
        }

    }, [bookError, chapterError, contentsError, contentsFetching, navigate])

    if (contentsError && contentsError.status === 404) {
        return "Contents not found."
    }

    const nextButton = chapter && chapter.links.previous ? (<Button className={styles['readerLayout__nav']} shape="circle" icon={<MdChevronRight />} onClick={onPrevious} />) : null
    const previousButton = chapter && chapter.links.next ? (<Button className={styles['readerLayout__nav']} shape="circle" icon={<MdChevronLeft />} onClick={onNext} />) : null

    return (<>
         <Layout className={styles.readerPage} style={{ direction: getDirection(), background: colorBgContainer }}>
            <Header style={{ background: colorBgContainer }} >
                <Row>
                    <Col>
                        <Tooltip placement="topLeft" title={t('chapters.title')}>
                            <Button type="text" shape="circle" onClick={openChapters} icon={<ImMenu4 />} />
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip placement="topLeft" title={t('reader.settings')}>
                            <Button type="text" shape="circle" onClick={openSettings} icon={<MdSettings />} />
                        </Tooltip>
                    </Col>
                    <Col flex="1" style={{ textAlign: 'center', fontFamily: font }} >{book?.title}</Col>
                    <Col>
                        <Tooltip placement="topLeft" title={t('actions.close')}>
                           <Button type="text" shape="circle" onClick={onClose} icon={<IoIosCloseCircle />} />
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
            <Content className={styles.readerLayout} style={{ background: colorBgContainer }} >
                {nextButton}
                <div className={styles['readerLayout__contents']}>
                    <Reader loading={contentsFetching} contents={contents?.text} mode={view} t={t} font={font} size={`${size}em`} lineHeight={`${lineHeight}em`} />
                </div>
                {previousButton}
            </Content>
            <Footer  style={{ background: colorBgContainer, textAlign: 'center' }} >{ book?.title }</Footer>
        </Layout>
        <Drawer title={t('reader.settings')} placement="left" onClose={onCloseSettings} open={showSetting}>
            <Typography>{t('reader.view.title')}</Typography>
            <Segmented options={readerViews} block size="large" onChange={ setView } value={view} />
            <Divider />
            <Typography>{t('reader.fontSize')}</Typography>
            <Slider defaultValue={size} min={0.5} max={3.0} step={0.1} onChange={ setSize } />
            <Divider />
            <Typography>{t('reader.lineSpacing')}</Typography>
            <Slider defaultValue={lineHeight} min={1.0} max={3.0} step={0.1} onChange={ setLineHeight } />
            <Divider />
            <Row><Col><BsFileEarmarkFont /></Col><Col><Typography>{t('reader.font')}</Typography></Col></Row>
            <FontList selectedFont={font} onChanged={f => setFont(f)} t={t}  />
        </Drawer>
        <Drawer title={t('chapters.title')} placement="left" onClose={onCloseChapters} open={showChapters}>
            <ChaptersMenu selectedChapterNumber={chapter?.chapterNumber} t={t} libraryId={libraryId} bookId={bookId} onChanged={gotoChapter} />
        </Drawer>



    </>)
}

export default BookReader