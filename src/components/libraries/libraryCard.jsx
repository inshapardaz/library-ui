import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// 3rd party libraries
import { Card } from 'antd';

// Internal Imports
import helpers from "../../helpers";
import styles from '../../styles/common.module.scss'
// ---------------------------------

const LibraryCard = ({ library }) => {
    const { t } = useTranslation()
    const title = (<Link to={`/libraries/${library.id}`}>{library.name}</Link>);
    const cover = (<img src={helpers.defaultLibraryImage} className={ styles["library__image"]} alt="library" />);
    return (<Card cover={cover}>
        <Card.Meta title={title} description={t(`languages.${library.language}`)}/>
      </Card>);
}


export default LibraryCard;