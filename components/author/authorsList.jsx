import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

// 3rd party libraries
import { List, Switch } from "antd";

// Local Imports
import libraryService from "@/services/libraryService"
import ApiContainer from "../common/ApiContainer"
import AuthorCard from './authorCard'
import helpers from '@/helpers/index';
import AuthorListItem from "./authorListItem";

// ------------------------------------------------------

const grid = {
    gutter: 4,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 5,
};

// ------------------------------------------------------

function AuthorsList({libraryId, query, authorType, pageNumber, pageSize}) {
    const t = useTranslations();
    const router = useRouter();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [authors, setAuthors] = useState(null);
    const [showList, setShowList] = useState(false);
    
    useEffect(() =>  {
        setShowList (localStorage.getItem('author-list-vie') === 'true')
    }, [])

    useEffect(() => {
        setBusy(true);
        setError(false);
    
        libraryService.getAuthors(libraryId, query, authorType, pageNumber, pageSize)
            .then(res => setAuthors(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }, [libraryId, query, authorType, pageNumber, pageSize])
   
    const toggleView = (checked) => {
        setShowList(checked);
        localStorage.setItem('author-list-view', checked)
    };

    const renderItem = (author) => {
        if (showList) {
            return <AuthorListItem key={author.id} libraryId={libraryId} author={author} t={t} />
        } 
        else {
            return <List.Item><AuthorCard key={author.id} libraryId={libraryId} author={author} t={t} /></List.Item>
        }
    }

    const onPageChanged = (newPage, newPageSize) => {
        router.push(helpers.buildLinkToAuthorsPage(
            `/libraries/${libraryId}/authors`,
            newPage,
            newPageSize,
            query,
            authorType
            ));
        }

        return (<ApiContainer
            busy={busy} 
            error={error} 
            empty={authors && authors.data && authors.data.length < 1}
            actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>           
            <List
                grid={ showList ? null : grid}
                loading={busy}
                size="large"
                itemLayout={ showList ? "vertical": "horizontal" }
                dataSource={authors ? authors.data : []}
                pagination={{
                    onChange: onPageChanged,
                    pageSize: authors ? authors.pageSize : 0,
                    current: authors ? authors.currentPageIndex : 0,
                    total: authors ? authors.totalCount : 0,
                    showSizeChanger: true,
                    responsive: true,
                    showQuickJumper: true,
                    pageSizeOptions: [12, 24, 48, 96]
                }}
                renderItem={renderItem}
            />
        </ApiContainer>);
}

export default AuthorsList;