import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library import
import { Box, Text } from '@mantine/core';
import moment from "moment";

// Local imports
import { getDateFormatFromFrequency } from '@/utils';
import { IconIssue } from '@/components/icon';
import classes from '@/components/books/bookCard.module.css';
//---------------------------------------

// An issue as a cover tile labelled with its number, with its date and page count underneath.
const IssueCard = ({ libraryId, issue, frequency }) => {
    const { t } = useTranslation();
    const [imgError, setImgError] = useState(false);
    const date = moment(issue.issueDate).format(getDateFormatFromFrequency(frequency));
    const href = `/libraries/${libraryId}/periodicals/${issue.periodicalId}/volumes/${issue.volumeNumber}/issues/${issue.issueNumber}`;

    return (
        <Box>
            <Link to={href} className={classes.cover} aria-label={date}>
                {issue.links?.image && !imgError
                    ? <img src={issue.links.image} alt="" loading="lazy" onError={() => setImgError(true)} />
                    : (
                        <Box ta="center" c="accent">
                            <IconIssue width={32} />
                            <Text fw={700} size="sm">{t('issue.issueNumber.title', { issueNumber: issue.issueNumber })}</Text>
                        </Box>
                    )}
            </Link>
            <Text component={Link} to={href} fw={600} size="sm" mt="xs" display="block" c="inherit" td="none">{date}</Text>
            {issue.pageCount != null && <Text size="xs" c="dimmed">{t('issue.pageCount', { count: issue.pageCount })}</Text>}
        </Box>
    );
};

IssueCard.propTypes = {
    libraryId: PropTypes.string,
    frequency: PropTypes.string,
    issue: PropTypes.shape({
        id: PropTypes.number,
        issueNumber: PropTypes.number,
        volumeNumber: PropTypes.number,
        issueDate: PropTypes.string,
        periodicalId: PropTypes.number,
        pageCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default IssueCard;
