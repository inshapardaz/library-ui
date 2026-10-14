import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Ui library import
import { Anchor, Box, Breadcrumbs, Divider, Flex, Group, Image, rem, Skeleton, Spoiler, Stack, Text, Title } from '@mantine/core';

// Local import
import If from '@/components/if';
import { Icon } from './icon';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import classes from './pageHeader.module.css';
//----------------------------------
export const PageHeaderSkeleton = () => {
    return (<Flex
        mih={50}
        m="md"
        gap="md"
        justify="flex-start"
        align="flex-end"
        direction="row"
        wrap="wrap"
    >
        <Skeleton height={rem(96)} radius="md" />
        <Skeleton height={rem(45)} radius="md" />
        <span style={{ flex: '1' }} />
        <Skeleton height={rem(45)} width={rem(150)} radius="md" />
    </Flex>)
}

//----------------------------------
const PageHeader = ({ title, subTitle, details, imageLink, defaultIcon, breadcrumbs = [], actions = [] }) => {
    const { t } = useTranslation();
    const [imgError, setImgError] = useState(false);

    return (<div className={classes.band}>
        <If condition={breadcrumbs && breadcrumbs.length > 0}>
            <Breadcrumbs className={classes.crumbs}>
                {breadcrumbs.map((item, index) => (
                    <Anchor component={Link} to={item.href} key={`breadcrumb-${index}`} underline="hover" c="dimmed">
                        <Group wrap='nowrap' gap='xs'>
                            <If condition={item.icon}>
                                <Icon name={item.icon} l height={16} />
                            </If>
                            {item.title}
                        </Group>
                    </Anchor>
                ))}
            </Breadcrumbs>
        </If>
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-end"
            direction="row"
            wrap="wrap"
        >
            <Box visibleFrom='sm'>
                <If condition={imageLink && !imgError}
                    elseChildren={<span className={classes.mono}><Icon name={defaultIcon} height={rem(28)} /></span>}>
                    <Image
                        src={imageLink}
                        h={96}
                        w="auto"
                        radius="md"
                        alt={title}
                        fit="contain"
                        onError={() => setImgError(true)}
                    />
                </If>
            </Box>
            <Stack gap={4}>
                <Group>
                    <Title order={2}>{title}</Title>
                    {actions}
                </Group>
                <If condition={subTitle}>
                    <Title order={4} c="dimmed" fw={400}>{subTitle}</Title>
                </If>
            </Stack>
            <If condition={details}>
                <Box style={{ width: '100%' }}>
                    <Divider />
                    <Spoiler maxHeight={60} showLabel={t('actions.showMore')} hideLabel={t('actions.hide')}>
                        <Text c="dimmed">{details}</Text>
                    </Spoiler>
                </Box>
            </If>
        </Flex>
    </div>);
}

PageHeader.propTypes = {
    title: PropTypes.node,
    subTitle: PropTypes.node,
    details: PropTypes.node,
    imageLink: PropTypes.string,
    defaultIcon: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        href: PropTypes.string,
        icon: PropTypes.string,
    })),
    actions: PropTypes.any
}

export default PageHeader;