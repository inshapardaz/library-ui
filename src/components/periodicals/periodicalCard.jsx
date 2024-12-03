import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, Tooltip, useMantineTheme, Center, Image, Divider } from '@mantine/core';

// Local imports
import { IconPeriodical } from '@/components/icon';
import IconText from '@/components/iconText';
import FrequencyIcon from './frequencyIcon'
//---------------------------------------

const PeriodicalCard = ({ libraryId, periodical }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <Center h={450}><IconPeriodical width={250} style={{ color: theme.colors.dark[1] }} /></Center>;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {periodical.links?.image ?
                    <Image h={450} radius="sm" src={periodical?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/pariodicals/${periodical.id}`} truncate="end" fw={500}>{periodical.title}</Text>
            </Group>

            {periodical?.description ?
                (<Tooltip label={periodical.description} withArrow>
                    <Text size="sm" c="dimmed" lineClamp={1}>
                        {periodical.description}
                    </Text>
                </Tooltip>) :
                (<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                    {t('periodical.noDescription')}
                </Text>)}

            <Group mt="md">
                {periodical.issueCount != null ? (<IconText icon={<IconPeriodical height={16} style={{ color: theme.colors.dark[2] }} />}
                    text={t('periodical.issueCount', { count: periodical.issueCount })} />) : null}
                <Divider orientation="vertical" />
                <FrequencyIcon frequency={periodical.frequency} showLabel c="dimmed" size="sm" height={16} style={{ color: theme.colors.gray[6] }} />
            </Group>
        </Card>
    )
}

PeriodicalCard.propTypes = {
    libraryId: PropTypes.string,
    periodical: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        language: PropTypes.string,
        frequency: PropTypes.string,
        issueCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default PeriodicalCard