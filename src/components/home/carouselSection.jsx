import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Ui Library imports
import { Anchor, Box, Button, Center, Divider, Group, Loader, Stack, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

// Local imports
import { IconRefreshAlert } from '@/components/icon';

//------------------------------

// A titled carousel for the Home page. Renders nothing when there is nothing to show, so empty
// sections (a library without poetry, say) do not leave gaps.
const CarouselSection = ({ title, viewAllTo, result, render }) => {
    const { t } = useTranslation();
    const items = result.data?.data ?? [];

    if (!result.isFetching && !result.error && items.length === 0) {
        return null;
    }

    let content;
    if (result.isFetching) {
        content = <Center h={100}><Loader size={30} /></Center>;
    } else if (result.error) {
        content = (
            <Center h={100}>
                <Button rightSection={<IconRefreshAlert />} onClick={result.refetch}>{t('actions.retry')}</Button>
            </Center>);
    } else {
        content = (
            <Carousel
                slideSize={{ base: '46%', sm: '50%', md: '33.333333%', lg: '20%' }}
                slideGap="md"
                loop
                align="start">
                {items.map((item) => (
                    <Carousel.Slide key={item.id}>{render(item)}</Carousel.Slide>
                ))}
            </Carousel>);
    }

    return (
        <Box>
            <Stack>
                <Group justify="space-between">
                    <Title order={3}>{title}</Title>
                    {viewAllTo && <Anchor component={Link} underline="hover" to={viewAllTo}>{t('actions.viewAll')}</Anchor>}
                </Group>
                {content}
                <Divider my="md" />
            </Stack>
        </Box>
    );
};

CarouselSection.propTypes = {
    title: PropTypes.string.isRequired,
    viewAllTo: PropTypes.string,
    result: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
};

export default CarouselSection;
