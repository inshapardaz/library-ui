import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Ui Library import
import { Card, Text, Group, Image } from '@mantine/core';

// Local imports
import AuthorsAvatar from '@/components/authors/authorsAvatar';
import FavoriteButton from './favoriteButton';
import If from '@/components/if';
import cardClasses from '@/components/contentCard.module.css';
import variantIndex from '@/utils/colorVariant';
//---------------------------------------
const IMAGE_HEIGHT = 150;

const WritingCard = ({ libraryId, writing }) => {
    const [imgError, setImgError] = useState(false);

    const cover = (
        <div className={`${cardClasses.coverMini} ${cardClasses['c' + variantIndex(writing.id)]}`} style={{ aspectRatio: 'auto', height: IMAGE_HEIGHT }}>
            <div className={cardClasses.coverOrnament}>✦</div>
            <Text className={cardClasses.coverTitle} lineClamp={3}>{writing.title}</Text>
        </div>
    );

    return (
        <Card shadow="sm" padding="lg" radius="md" key={writing.id} withBorder>
            <Card.Section>
                <If condition={writing.links?.image && !imgError} elseChildren={cover}>
                    <Image h={IMAGE_HEIGHT} radius="sm" src={writing?.links?.image} onError={() => setImgError(true)} />
                </If>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/writings/${writing.id}`} truncate="end" fw={500}>{writing.title}</Text>
                <FavoriteButton article={writing} readonly />
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <AuthorsAvatar libraryId={libraryId} authors={writing?.authors} />
            </Group>
        </Card >
    )
}

WritingCard.propTypes = {
    libraryId: PropTypes.string,
    writing: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
};

export default WritingCard