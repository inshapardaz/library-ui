import Image from "next/image";

// 3rd party libraries
import { Col, Row, Typography } from "antd";

// Local imports
import helpers from "@/helpers/index";
import { BookCategory } from "./bookCategory";
import { BookSeriesInfo } from "./bookSeriesInfo";

// -----------------------------------------
const { Title, Paragraph } = Typography;
// -----------------------------------------
function BookInfo ({ libraryId, book, t }) 
{

    const cover = (book.links.image ? <Image src={book.links.image} onError={helpers.setDefaultBookImage} width="262" height="400" alt={book.title}  /> : 
    <Image src={helpers.defaultBookImage}  width="262" height="400" alt={book.title} />);
    
    return (<>
        <Row gutter={[8, 32]}>
            <Col span={24}>{ cover }</Col>
            <Col span={24}>
                <Title level={2}>{ book.title }</Title>
            </Col>
            <Col span={24}>
                <Paragraph ellipsis={{ rows: 4, tooltip : book.description }}>
                    { book.description }
                </Paragraph>
            </Col>
            { book.yearPublished && <Col span={24}>
                { t('book.publishLabel', { year: book.yearPublished }) }
            </Col>}
            <Col span={24}>
                <BookCategory libraryId={libraryId} book={book}/>
            </Col>
            <Col span={24}>
                <BookSeriesInfo book={book} t={t} />
            </Col>
        </Row>
    </>)
}

export default BookInfo;