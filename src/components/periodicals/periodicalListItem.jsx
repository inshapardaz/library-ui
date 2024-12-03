import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Image, Stack, Text, Tooltip, useMantineTheme } from '@mantine/core';

// Local Imports
import { IconPages } from '@/components/icon';
import IconText from '@/components/iconText';
import FrequencyIcon from './frequencyIcon';
import { IconPeriodical } from '../icon';
//-------------------------------------

const PeriodicalListItem = ({ libraryId, periodical }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <IconPeriodical width={150} style={{ color: theme.colors.dark[1] }} />;

    return (
        <Group gap="sm" wrap="nowrap">
            {periodical.links?.image ?
                <Image w={150} radius="sm" src={periodical?.links?.image} /> :
                icon
            }
            <Stack>
                <Group justify="space-between">
                    <Text component={Link} to={`/libraries/${libraryId}/periodicals/${periodical.id}`} truncate="end" fw={500}>{periodical.title}</Text>
                </Group>
                {periodical?.description ?
                    (<Tooltip label={periodical.description} withArrow>
                        <Text size="sm" c="dimmed" lineClamp={1}>
                            {periodical.language}
                        </Text>
                    </Tooltip>) :
                    (<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                        {t('periodical.noDescription')}
                    </Text>)}
                <Group mt="md">
                    {periodical.issueCount != null ? (<IconText icon={<IconPages height={16} style={{ color: theme.colors.dark[2] }} />} text={t('periodical.issueCount', { count: periodical.issueCount })} />) : null}
                    <Divider orientation="vertical" />
                    <FrequencyIcon frequency={periodical.frequency} showLabel c="dimmed" size="sm" height={16} style={{ color: theme.colors.gray[6] }} />
                </Group>
            </Stack>
        </Group>)
}

PeriodicalListItem.propTypes = {
    libraryId: PropTypes.string,
    periodical: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        language: PropTypes.string,
        issueCount: PropTypes.number,
        frequency: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default PeriodicalListItem;