import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Card, Text, Group, useMantineTheme, Center, Image, Divider } from '@mantine/core';
import moment from "moment";

// Local imports
import { getDateFormatFromFrequency } from '@/utils';
import { IconIssue, IconPages, IconIssueArticle } from '@/components/icon';
import IconText from '@/components/iconText';
import If from '@/components/if';
//---------------------------------------

const IssueCard = ({ libraryId, issue, frequency }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <Center h={450} width={250}><IconIssue width={250} style={{ color: theme.colors.dark[1] }} /></Center>;
    const title = moment(issue.issueDate).format(getDateFormatFromFrequency(frequency));

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {issue.links?.image ?
                    <Image h={450} width={250} radius="sm" src={issue?.links?.image} /> :
                    icon
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/periodicals/${issue.periodicalId}/issues/${issue.id}`} truncate="end" fw={500}>
                    {title}
                </Text>
            </Group>


            <Group>
                <IconText text={t('issue.volumeNumber.title', { volumeNumber: issue.volumeNumber })}
                    link={`/libraries/${libraryId}/periodicals/${issue.periodicalId}?volumeNumber=${issue.volumeNumber}`} />
                <Divider orientation="vertical" />
                <IconText text={t('issue.issueNumber.title', { issueNumber: issue.issueNumber })} />
            </Group>
            <Group mt="md">
                <If condition={issue.pageCount != null}>
                    <IconText icon={<IconPages style={{ color: theme.colors.dark[2] }} />} text={issue.pageCount} />
                </If>
                <If condition={issue.articleCount != null}>
                    <Divider orientation="vertical" />
                    <IconText icon={<IconIssueArticle style={{ color: theme.colors.dark[2] }} />} text={issue.articleCount} />
                </If>
            </Group>
        </Card>
    )
}

IssueCard.propTypes = {
    libraryId: PropTypes.string,
    frequency: PropTypes.string,
    issue: PropTypes.shape({
        id: PropTypes.number,
        issueNumber: PropTypes.number,
        volumeNumber: PropTypes.number,
        issueDate: PropTypes.string,
        periodicalId: PropTypes.number,
        periodicalName: PropTypes.string,
        pageCount: PropTypes.number,
        articleCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default IssueCard