import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// 3rd party libraries
import { Button, Card, List } from 'antd';
import { Link, useNavigate } from "react-router-dom";

// Internal Imports
import { getLibraries, getLibrariesStatus, getLibrariesError, fetchLibraries } from '../../features/libraries/librariesSlice'
import helpers from "../../helpers";
// ------------------------------------------------------

const grid = {
    gutter: 4,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 4,
    xl: 4,
    xxl: 6,
};

function ShowMoreButton ({ t }) {
    const navigate = useNavigate();
    return(<div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button size="small" onClick={() => navigate(`/libraries`)}>
            {t('actions.seeMore')}
        </Button>
    </div>);
}

const LibraryCard = ({ library }) => {
    const { t } = useTranslation()
    const title = (<Link href={`/libraries/${library.id}`}>{library.name}</Link>);
    const cover = (<img src={helpers.defaultLibraryImage} alt="library" />);
    return (<Card cover={cover}>
        <Card.Meta title={title} description={t(`langages.${library.language}`)}/>
      </Card>);
}

const LibrariesList = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const libraries = useSelector(getLibraries)
    const status = useSelector(getLibrariesStatus)
    const error = useSelector(getLibrariesError)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLibraries())
        }
    }, [dispatch, status])
    
    if (status === 'failed') {
        return <p>{error}</p>
    }
    return (
        <List
            loading={status === 'loading'}
            size="large"
            grid={ grid }
            itemLayout="vertical"
            dataSource={libraries ? libraries.data : []}
            loadMore={<ShowMoreButton t={t} />}
            renderItem={(l) => (<LibraryCard key={l.id} library={l} />)}
        />);
}

export default LibrariesList;