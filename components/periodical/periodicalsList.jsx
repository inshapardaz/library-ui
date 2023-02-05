import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";

// 3rd party libraries
import { List, Switch } from "antd";

// Local Imports
import libraryService from "@/services/libraryService"
import ApiContainer from "../common/ApiContainer"
import helpers from '../../helpers';
import PeriodicalListItem from "./periodicalListItem";
import PeriodicalCard from "./periodicalCard";

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

function PeriodicalsList({libraryId, query, pageNumber, pageSize}) {
    const t = useTranslations();
    const router = useRouter();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [periodicals, setPeriodicals] = useState(null);
    const [showList, setShowList] = useLocalStorage('periodical-list-view', false);
    
    useEffect(() => {
        setBusy(true);
        setError(false);
    
        libraryService.getPeriodicals(libraryId, query, pageNumber, pageSize)
            .then(res => setPeriodicals(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }, [libraryId, query, pageNumber, pageSize])
   
    const toggleView = (checked) => {
        setShowList(checked);
    };

    const onPageChanged = (newPage, newPageSize) => {
        router.push(helpers.buildLinkToPeriodicalsPage(
            `/libraries/${libraryId}/periodicals`,
            newPage,
            newPageSize,
            query
            ));
        }

        return (<ApiContainer
            busy={busy} 
            error={error} 
            empty={periodicals && periodicals.data && periodicals.data.length < 1}
            actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>           
            <List
                grid={ showList ? null : grid}
                loading={busy}
                size="large"
                itemLayout={ showList ? "vertical": "horizontal" }
                dataSource={periodicals ? periodicals.data : []}
                pagination={{
                    onChange: onPageChanged,
                    pageSize: periodicals ? periodicals.pageSize : 0,
                    current: periodicals ? periodicals.currentPageIndex : 0,
                    total: periodicals ? periodicals.totalCount : 0,
                    showSizeChanger: true,
                    responsive: true,
                    showQuickJumper: true,
                    pageSizeOptions: [12, 24, 48, 96]
                }}
                renderItem={(p) => (
                <List.Item>
                    { showList ?  
                       <PeriodicalListItem key={p.id} libraryId={libraryId} periodical={p} t={t} />:
                       <PeriodicalCard key={p.id} libraryId={libraryId} periodical={p} t={t} />
                    }
                </List.Item>
                )}
            />
        </ApiContainer>);
}

export default PeriodicalsList;