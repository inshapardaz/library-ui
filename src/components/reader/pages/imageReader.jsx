import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// UI Library Import
import { ActionIcon, Center, Image, Loader, useDirection } from '@mantine/core';
import { useElementSize, useHotkeys, useViewportSize } from '@mantine/hooks';

// Local imports
import { useGetBookPageQuery } from '@/store/slices/books.api';
import Error from '@/components/error';
import { IconLeft, IconRight } from '@/components/icon';
import If from '@/components/if';
import classes from './imageReader.module.css';
import useTouchSlide from '@/hooks/useTouchSlide';
//---------------------------------
const pageWidth = 400;

const ImageReader = ({ libraryId, bookId, pageNumber, direction }) => {
    const { t } = useTranslation();
    const { dir } = useDirection();
    const finalDirection = useMemo(() => direction ? direction : dir, [dir, direction]);

    const navigate = useNavigate();
    const [numberOfPages, setNumberOfPages] = useState(2);
    const { ref, height } = useElementSize();
    const { width } = useViewportSize();

    useEffect(() => {
        setNumberOfPages(width > 1000 ? 2 : 1)
    }, [width]);

    const {
        data: page1,
        error: errorPage1,
        isFetching: loadingPage1,
        refetch: refrechPage1
    } = useGetBookPageQuery({
        libraryId,
        bookId,
        pageNumber
    }, { skip: !libraryId || !bookId || !pageNumber });

    const {
        data: page2,
        error: errorPage2,
        isFetching: loadingPage2,
        refetch: refrechPage2
    } = useGetBookPageQuery({
        libraryId,
        bookId,
        pageNumber: pageNumber + 1
    }, { skip: numberOfPages !== 2 || !libraryId || !bookId || !pageNumber });

    const hasNextPage = useMemo(() => numberOfPages == 2 ? page2?.links?.next != null : page1?.links?.next != null, [numberOfPages, page1?.links?.next, page2?.links?.next]);


    const movePrevious = () => {
        if (!loadingPage1 && !loadingPage2 &&
            !errorPage1 && !errorPage2 && pageNumber > 1) {
            navigate(`/libraries/${libraryId}/books/${bookId}/read?page=${pageNumber - numberOfPages}`)
        }
    }

    const moveNext = () => {
        if (!loadingPage1 && !loadingPage2 &&
            !errorPage1 && !errorPage2 &&
            numberOfPages == 2 ? page2?.links?.next != null : page1?.links?.next != null)
            navigate(`/libraries/${libraryId}/books/${bookId}/read?page=${pageNumber + numberOfPages}`)
    }

    const onNavigateLeft = () => {
        finalDirection == "rtl" ? moveNext() : movePrevious()
    }

    const onNavigateRight = () => {
        finalDirection == "rtl" ? movePrevious() : moveNext()
    }

    useTouchSlide({
        ref,
        onSlideLeft: onNavigateLeft,
        onSlideRight: onNavigateRight
    });

    useHotkeys([
        ['ArrowLeft', onNavigateLeft],
        ['ArrowRight', onNavigateRight],
    ]);

    if (loadingPage1 || loadingPage2) {
        return <Center h={height}><Loader /></Center>
    }

    if (errorPage1 || errorPage2) {
        <Error title={t('book.error.loadingPage.title')}
            detail={t('book.error.loadingPage.detail')}
            onRetry={() => {
                refrechPage1()
                refrechPage2()
            }} />
    }

    const hasPreviousPage = page1?.links?.previous != null;

    return <div className={classes.imageReader} ref={ref}>
        <div className={classes.imageReaderNavNextButton}>
            <ActionIcon disabled={!hasPreviousPage} size="xl" variant="default" onClick={movePrevious}>
                {finalDirection == "rtl" ?
                    <IconRight />
                    :
                    <IconLeft />
                }
            </ActionIcon>
        </div>

        <div className={`${classes.imageReaderPagesContainer} ${numberOfPages == 2 ? classes.imageReaderPagesContainerDouble : classes.imageReaderPagesContainerSingle}`}>
            <Image className={classes.imageReaderPageImage} fit="contain" w={pageWidth} src={page1?.links?.image} draggable='false' />
            <If condition={numberOfPages == 2 && page2}>
                <Image className={classes.imageReaderPageImage} fit="contain" w={pageWidth} src={page2?.links?.image} draggable='false' />
            </If>
        </div>
        <div className={classes.imageReaderNavPrevButton}>
            <ActionIcon size="xl" disabled={!hasNextPage} variant="default" onClick={moveNext}>
                {finalDirection == "rtl" ?
                    <IconLeft />
                    :
                    <IconRight />
                }
            </ActionIcon>
        </div>
    </div >
}

ImageReader.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.string,
    pageNumber: PropTypes.number,
    direction: PropTypes.string,
}
export default ImageReader;