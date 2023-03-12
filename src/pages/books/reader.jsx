import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

// 3rd party libraries
import { useLocalStorage } from "usehooks-ts";
import { Button, Layout, Spin, theme, Drawer, Row, Col, Tooltip, Divider, Typography, Slider } from 'antd';
import { ImMenu4 } from 'react-icons/im'
import { IoIosCloseCircle } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'

// Local imports
import styles from '../../styles/reader.module.scss'
import { useGetBookQuery, useGetChapterQuery, useGetChapterContentsQuery } from "../../features/api/booksSlice"
import { languages } from '../../features/ui/uiSlice';
import Reader from "../../components/reader";
import ChaptersList from "../../components/books/chapters/chaptersList";
import FontList from "../../components/reader/fontList";
//------------------------------------------------

const { Header, Content } = Layout;

//------------------------------------------------

const getDirection = (lang) => languages[lang].dir

//------------------------------------------------

const BookReader = () => {
    const { t } = useTranslation()
    const {
    token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()
    const { libraryId, bookId, chapterId } = useParams()
    const { data: book, error: bookError, isFetching : bookFetching} = useGetBookQuery({libraryId, bookId}, { skip : !libraryId || !bookId })
    const { data : chapter, error: chapterError, isFetching } = useGetChapterQuery({libraryId, bookId, chapterId}, { skip : !libraryId || !bookId || !chapterId })
    const { data : contents, error: contentsError, isFetching: contentsFetching } = useGetChapterContentsQuery({libraryId, bookId, chapterId}, { skip : !libraryId || !bookId || !chapterId })
    
    const [font, setFont] = useLocalStorage('reader-font', 'MehrNastaleeq')
    const [size, setSize] = useLocalStorage('reader-font-size', 2.0);
    const [lineHeight, setLineHeight] = useLocalStorage('reader-line-height', 1.5);
    const [showChapters, setShowChapters] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const openSettings = () => setShowSetting(true)
    const onCloseSettings = () => setShowSetting(false)

    const openChapters = () => setShowChapters(true)
    const onCloseChapters = () => setShowChapters(false)

    const onClose = () => navigate(`/libraries/${libraryId}/books/${bookId}`)

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

    if (bookFetching || isFetching || contentsFetching ) return <Spin />

    return (<>
         <Layout  className={styles.readerLayout} style={{ direction: getDirection(contents.language) }}>
            <Header style={{ background: colorBgContainer }} className={styles['readerLayout__header']} >
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
                    <Col flex="1" style={{ textAlign: 'center', fontFamily: font }} >{book.title}</Col>
                    <Col>
                        <Tooltip placement="topLeft" title={t('actions.close')}>
                           <Button type="text" shape="circle" onClick={onClose} icon={<IoIosCloseCircle />} />
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
            <Content>
                <Reader contents={contents.text} mode="vertical" t={t}  font={font} size={`${size}em`} lineHeight={`${lineHeight}em`} />
            </Content>
        </Layout>
        <Drawer title={t('reader.settings')} placement="left" onClose={onCloseSettings} open={showSetting}>
            <Typography>{t('reader.fontSize')}</Typography>
            <Slider defaultValue={size} min={0.5} max={3.0} step={0.1} onChange={value => setSize(value) } />
            <Divider />
            <Typography>{t('reader.lineSpacing')}</Typography>
            <Slider defaultValue={lineHeight} min={1.0} max={3.0} step={0.1} onChange={value => setLineHeight(value) } />
            <Divider />
            <Typography>{t('reader.font')}</Typography>
            <FontList selectedFont={font} onChanged={f => setFont(f)} t={t}  />
        </Drawer>

        <Drawer title={t('chapters.title')} placement="left" onClose={onCloseChapters} open={showChapters}>
            <ChaptersList hideTitle selectedChapterNumber={chapter.chapterNumber} libraryId={libraryId} bookId={bookId} t={t} />
        </Drawer>
    </>)
}

export default BookReader