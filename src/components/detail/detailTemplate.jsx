import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

// Ui Library imports
import { Anchor, Box, Breadcrumbs, Container, Group, Image, Stack, Tabs, Text, Title, rem } from '@mantine/core';
import { Link } from 'react-router-dom';

// Local imports
import If from '@/components/if';
import { Icon } from '@/components/icon';
import { useState } from 'react';

//------------------------------

// The shared layout of every detail page (book, author, series, periodical, issue, poem,
// writing): image and key metadata on top, the primary action and the secondary actions in the
// same place on every page, then tabs (About / Contents / Related) for what each type has.
// On phones the header stacks so the title and the primary action sit above the fold.
//
// tabs: [{ value: 'about' | 'contents' | 'related', label?, content: node }] - empty ones are
// skipped; `label` overrides the default tab name (e.g. "Issues" for the contents of a periodical).
// `tabParam` is the query parameter holding the active tab.
const DetailTemplate = ({
    breadcrumbs = [],
    title,
    subTitle,
    meta,
    image,
    imageAlt,
    fallbackIcon,
    primaryAction,
    secondaryActions = [],
    tabs = [],
    tabParam = 'tab',
}) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [imgError, setImgError] = useState(false);
    const visibleTabs = tabs.filter((tab) => tab && tab.content);
    const requested = searchParams.get(tabParam);
    const active = visibleTabs.some((tab) => tab.value === requested) ? requested : visibleTabs[0]?.value;

    const selectTab = (value) => {
        const next = new URLSearchParams(searchParams);
        next.set(tabParam, value);
        setSearchParams(next, { replace: true });
    };

    return (
        <Container fluid mt="sm">
            <Breadcrumbs mx="md" mb="md">
                {breadcrumbs.map((crumb) => (
                    <Anchor key={crumb.href} component={Link} to={crumb.href} size="sm">
                        {crumb.icon && <Icon name={crumb.icon} height={rem(14)} style={{ verticalAlign: 'middle' }} />}{' '}
                        {crumb.title}
                    </Anchor>
                ))}
            </Breadcrumbs>

            <Container size="responsive">
                <Group align="flex-start" wrap="wrap" gap="xl">
                    <If condition={image && !imgError} elseChildren={fallbackIcon ? <Box>{fallbackIcon}</Box> : null}>
                        <Image src={image} h={rem(320)} w="auto" radius="md" alt={imageAlt ?? title}
                            fit="contain" onError={() => setImgError(true)} />
                    </If>
                    <Stack style={{ flex: 1, minWidth: rem(240) }} gap="sm">
                        <Title order={1}>{title}</Title>
                        {subTitle && <Text c="dimmed">{subTitle}</Text>}
                        {meta}
                        <Group gap="md" mt="xs" wrap="wrap">
                            {primaryAction}
                            <Group gap="xs" data-testid="secondary-actions">
                                {secondaryActions.filter(Boolean)}
                            </Group>
                        </Group>
                    </Stack>
                </Group>

                {visibleTabs.length === 1 && <Box mt="xl">{visibleTabs[0].content}</Box>}
                {visibleTabs.length > 1 && (
                    <Tabs value={active} onChange={selectTab} mt="xl">
                        <Tabs.List style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                            {visibleTabs.map((tab) => (
                                <Tabs.Tab key={tab.value} value={tab.value}>{tab.label ?? t(`detail.tabs.${tab.value}`)}</Tabs.Tab>
                            ))}
                        </Tabs.List>
                        {visibleTabs.map((tab) => (
                            <Tabs.Panel key={tab.value} value={tab.value} pt="md">{tab.content}</Tabs.Panel>
                        ))}
                    </Tabs>
                )}
            </Container>
        </Container>
    );
};

DetailTemplate.propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        href: PropTypes.string,
        icon: PropTypes.string,
    })),
    title: PropTypes.string,
    subTitle: PropTypes.node,
    meta: PropTypes.node,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    fallbackIcon: PropTypes.node,
    primaryAction: PropTypes.node,
    secondaryActions: PropTypes.arrayOf(PropTypes.node),
    tabs: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOf(['about', 'contents', 'related']),
        label: PropTypes.string,
        content: PropTypes.node,
    })),
    tabParam: PropTypes.string,
};

export default DetailTemplate;
