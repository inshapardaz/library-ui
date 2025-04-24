import { useMemo } from 'react';
import PropTypes from 'prop-types';

//UI Library imports
import { Group, Center, Text } from '@mantine/core';
import { Spotlight, SpotlightActionsGroup } from '@mantine/spotlight';

// Local imports
import { IconWritings } from "@/components/icon";
import { useGetArticlesQuery } from '@/store/slices/articles.api';
import Img from '@/components/img';

const WritingsSearchSection = ({ t, navigate, libraryId, query, pageSize = 3 }) => {
    const {
        data: writings, isError: writingsError, isFetching: writingsLoading,
    } = useGetArticlesQuery({
        libraryId,
        query,
        type: 'writing',
        pageSize
    }, {
        skip: query.length < 3
    });

    const hasWritings = useMemo(() => !writingsLoading && !writingsError && writings?.data?.length > 0, [writingsLoading, writingsError, writings]);

    const icon = <IconWritings width={24} stroke={1.5} />;

    if (!hasWritings) {
        if (query.length < 3) {
            return (<Spotlight.Action key={t('header.writings')}
                label={t('header.writings')}
                description={t('writings.description')}
                leftSection={icon}
                onClick={() => navigate(`/libraries/${libraryId}/writings`)} />);
        }

        return null;
    }

    return (<SpotlightActionsGroup label={t('header.writings')}>
        {writings.data
            .map((writing) => <Spotlight.Action key={writing.id}
                onClick={() => navigate(`/libraries/${libraryId}/writings/${writing.id}`)}>
                <Group wrap="nowrap" w="100%">
                    <Center>
                        <Img
                            src={writing.links.image}
                            h={50}
                            w={24}
                            alt={writing.title}
                            fit="contain"
                            fallback={icon} />
                    </Center>

                    <div style={{ flex: 1 }}>
                        <Text>{writing.title}</Text>

                        {writing.description && (
                            <Text opacity={0.6} size="xs" truncate="end">
                                {writing.description}
                            </Text>
                        )}
                    </div>
                </Group>
            </Spotlight.Action>)}
    </SpotlightActionsGroup>);
};
WritingsSearchSection.propTypes = {
    t: PropTypes.any.isRequired,
    navigate: PropTypes.any.isRequired,
    libraryId: PropTypes.string.isRequired,
    query: PropTypes.string,
    pageSize: PropTypes.number,
};

export default WritingsSearchSection;
