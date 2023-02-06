import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";

// 3rd party libraries
import { List, Switch } from "antd";

// Local Imports
import libraryService from "@/services/libraryService"
import ApiContainer from "../common/ApiContainer"
import helpers from '@/helpers/index';
import SeriesListItem from "./seriesListItem";
import SeriesCard from "./seriesCard";

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

function SeriesList({libraryId, query, pageNumber, pageSize}) {
    const t = useTranslations();
    const router = useRouter();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState(false);
    const [series, setSeries] = useState(null);
    const [showList, setShowList] = useLocalStorage('series-list-view', false);
    
    useEffect(() => {
        setBusy(true);
        setError(false);
    
        libraryService.getSeries(libraryId, query, pageNumber, pageSize)
            .then(res => setSeries(res))
            .catch(_ => setError(true))
            .finally(_ => setBusy(false))
    }, [libraryId, query, pageNumber, pageSize])
   
    const toggleView = (checked) => {
        setShowList(checked);
    };

    const onPageChanged = (newPage, newPageSize) => {
        router.push(helpers.buildLinkToSeriesPage(
            `/libraries/${libraryId}/series`,
            newPage,
            newPageSize,
            query
            ));
        }

        return (<ApiContainer
            busy={busy} 
            error={error} 
            empty={series && series.data && series.data.length < 1}
            actions={(<Switch checkedChildren={t('actions.list')} unCheckedChildren={t('actions.card')} checked={showList} onChange={toggleView} />) }>           
            <List
                grid={ showList ? null : grid}
                loading={busy}
                size="large"
                itemLayout={ showList ? "vertical": "horizontal" }
                dataSource={series ? series.data : []}
                pagination={{
                    onChange: onPageChanged,
                    pageSize: series ? series.pageSize : 0,
                    current: series ? series.currentPageIndex : 0,
                    total: series ? series.totalCount : 0,
                    showSizeChanger: true,
                    responsive: true,
                    showQuickJumper: true,
                    pageSizeOptions: [12, 24, 48, 96]
                }}
                renderItem={(s) => (
                <List.Item>
                    { showList ?  
                       <SeriesListItem key={s.id} libraryId={libraryId} series={s} t={t} />:
                       <SeriesCard key={s.id} libraryId={libraryId} series={s} t={t} />
                    }
                </List.Item>
                )}
            />
        </ApiContainer>);
}

export default SeriesList;