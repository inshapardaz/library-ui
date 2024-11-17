import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// UI Library Import
import { ActionIcon, Center, Image, Loader, useDirection } from '@mantine/core';

// Local imports
import { useGetBookPageQuery } from '@/store/slices/books.api';
import Error from '@/components/error';
import { IconLeft, IconRight } from '@/components/icon';
import { useElementSize, useHotkeys } from '@mantine/hooks';
import classes from './imageReader.module.css';
//---------------------------------
const pageWidth = 400;

const ImageReader = ({ libraryId, bookId, pageNumber, direction }) => {
    const { t } = useTranslation();
    const { dir } = useDirection();

    const navigate = useNavigate();
    const [numberOfPages, setNumberOfPages] = useState(2);
    const { ref, width, height } = useElementSize();

    console.log(height);
    useEffect(() => {
        setNumberOfPages(Math.floor(width / pageWidth) > 1 ? 2 : 1)
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

    useHotkeys([
        ['ArrowLeft', () => finalDirection == "rtl" ? moveNext() : movePrevious()],
        ['ArrowRight', () => finalDirection == "rtl" ? movePrevious() : moveNext()],
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

    const finalDirection = direction ? direction : dir;
    const hasPreviousPage = page1?.links?.previous != null;
    const hasNextPage = numberOfPages == 2 ? page2?.links?.next != null : page1?.links?.next != null;

    return <div className={classes.imageReader} ref={ref}>
        <ActionIcon className={classes.imageReaderNavButton} disabled={!hasPreviousPage} size="xl" variant="default" onClick={movePrevious}>
            {finalDirection == "rtl" ?
                <IconRight />
                :
                <IconLeft />
            }
        </ActionIcon>
        <Image className={classes.imageReaderPageImage} fit="contain" w={pageWidth} src={page1?.links?.image} />
        {(numberOfPages == 2 && page2) ? <Image className={classes.imageReaderPageImage} fit="contain" w={pageWidth} src={page2?.links?.image} /> : null}
        <ActionIcon className={classes.imageReaderNavButton} size="xl" disabled={!hasNextPage} variant="default" onClick={moveNext}>
            {finalDirection == "rtl" ?
                <IconLeft />
                :
                <IconRight />
            }
        </ActionIcon>
    </div>
}

ImageReader.propTypes = {
    libraryId: PropTypes.string,
    bookId: PropTypes.string,
    pageNumber: PropTypes.number,
    direction: PropTypes.string,
}
export default ImageReader;