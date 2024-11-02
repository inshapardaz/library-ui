import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Group, Image, Stack, Table, Text, Tooltip, useMantineTheme } from '@mantine/core';

// Local Imports
import { IconSeries, IconBooks } from '@/components/icon';
import IconText from '../iconText';
//-------------------------------------

const SeriesListItem = ({ libraryId, series }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <IconSeries width={150} style={{ color: theme.colors.dark[1] }} />;

    return (<Table.Tr>
        <Table.Td>
            <Group gap="sm" wrap="nowrap">
                {series.links?.image ?
                    <Image w={150} radius="sm" src={series?.links?.image} /> :
                    icon
                }
                <Stack>
                    <Text component={Link} to={`/libraries/${libraryId}/series/${series.id}`} truncate="end" fw={500}>{series.name}</Text>
                    {series?.description ?
                        (<Tooltip label={series.description} withArrow>
                            <Text size="sm" c="dimmed" lineClamp={1}>
                                {series.description}
                            </Text>
                        </Tooltip>) :
                        (<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                            {t('series.noDescription')}
                        </Text>)}
                    {series?.bookCount ?
                        <IconText icon={<IconBooks height={16} style={{ color: theme.colors.dark[2] }} />} text={t('author.bookCount', { count: series?.bookCount })} />
                        : null}
                </Stack>
            </Group>
        </Table.Td>
    </Table.Tr>)
}

SeriesListItem.propTypes = {
    libraryId: PropTypes.string,
    series: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        bookCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default SeriesListItem;