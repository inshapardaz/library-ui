import PropTypes from 'prop-types';
import { useMemo } from 'react';

// Ui Library Imports
import { Group, Center, Text } from '@mantine/core';
import { Spotlight, SpotlightActionsGroup } from '@mantine/spotlight';

// Local imports
import { useGetSeriesQuery } from '@/store/slices/series.api';
import { IconSeries } from "@/components/icon";
import Img from '@/components/img';

//-----------------------------
const SeriesSearchSection = ({ t, navigate, libraryId, query, pageSize = 3 }) => {
    const {
        data: series, isError: seriesError, isFetching: seriesLoading,
    } = useGetSeriesQuery({
        libraryId,
        query,
        pageSize
    }, {
        skip: query.length < 3
    });

    const hasSeries = useMemo(() => !seriesLoading && !seriesError && series?.data?.length > 0, [seriesLoading, seriesError, series]);
    const icon = <IconSeries width={24} stroke={1.5} />;
    if (!hasSeries) {
        if (query.length < 3) {
            return (<Spotlight.Action key={t('header.series')}
                label={t('header.series')}
                description={t('series.description')}
                leftSection={icon}
                onClick={() => navigate(`/libraries/${libraryId}/series`)} />);
        }

        return null;
    }

    return (<SpotlightActionsGroup label={t('header.series')}>
        {series.data
            .map((series) => <Spotlight.Action key={series.id}
                onClick={() => navigate(`/libraries/${libraryId}/series/${series.id}`)}>
                <Group wrap="nowrap" w="100%">
                    <Center>
                        <Img
                            src={series.links.image}
                            h={50}
                            w={24}
                            alt={series.title}
                            fit="contain"
                            fallback={icon} />
                    </Center>
                    <div style={{ flex: 1 }}>
                        <Text>{series.name}</Text>

                        {series.description && (
                            <Text opacity={0.6} size="xs" truncate="end">
                                {series.description}
                            </Text>
                        )}
                    </div>
                </Group>
            </Spotlight.Action>)}
    </SpotlightActionsGroup>);
};
SeriesSearchSection.propTypes = {
    t: PropTypes.any.isRequired,
    navigate: PropTypes.any.isRequired,
    libraryId: PropTypes.string.isRequired,
    query: PropTypes.string,
    pageSize: PropTypes.number,
};

export default SeriesSearchSection;
