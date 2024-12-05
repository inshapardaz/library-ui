import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Divider, Group, Image, Stack, Text, useMantineTheme } from '@mantine/core';
import moment from "moment";

// Local Imports
import { getDateFormatFromFrequency } from '@/utils';
import { IconIssue, IconPages, IconIssueArticle, IconVolumeNumber, IconIssueNumber } from '@/components/icon';
import IconText from '@/components/iconText';
import If from '@/components/if';
//-------------------------------------

const IssueListItem = ({ libraryId, issue, frequency }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    const icon = <IconIssue width={150} style={{ color: theme.colors.dark[1] }} />;
    const title = moment(issue.issueDate).format(getDateFormatFromFrequency(frequency));

    return (
        <Group gap="sm" wrap="nowrap">
            {issue.links?.image ?
                <Image w={150} radius="sm" src={issue?.links?.image} /> :
                icon
            }
            <Stack>
                <Group justify="space-between">
                    <Text component={Link} to={`/libraries/${libraryId}/books/${issue.id}`} truncate="end" fw={500}>{title}</Text>
                </Group>
                <Group mt="md">
                    <IconText icon={<IconVolumeNumber style={{ color: theme.colors.dark[2] }} />}
                        text={t('issue.volumeNumber.title', { volumeNumber: issue.volumeNumber })}
                        link={`/libraries/${libraryId}/periodicals/${issue.periodicalId}?volumeNumber=${issue.volumeNumber}`} />
                    <Divider orientation="vertical" />
                    <IconText icon={<IconIssueNumber style={{ color: theme.colors.dark[2] }} />}
                        text={t('issue.issueNumber.title', { issueNumber: issue.issueNumber })} />
                </Group>
                <Group mt="md">
                    <If condition={issue.pageCount != null}>
                        <IconText icon={<IconPages style={{ color: theme.colors.dark[2] }} />} text={t('issue.pageCount', { count: issue.pageCount })} />
                    </If>
                    <If condition={issue.articleCount != null}>
                        <Divider orientation="vertical" />
                        <IconText icon={<IconIssueArticle style={{ color: theme.colors.dark[2] }} />} text={t('issue.articleCount', { count: issue.articleCount })} />
                    </If>
                </Group>
            </Stack>
        </Group>)
}

IssueListItem.propTypes = {
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
}

export default IssueListItem;