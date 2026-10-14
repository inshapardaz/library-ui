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

const PoetryCard = ({ libraryId, poetry }) => {
    const [imgError, setImgError] = useState(false);

    const cover = (
        <div className={`${cardClasses.coverMini} ${cardClasses['c' + variantIndex(poetry.id)]}`} style={{ aspectRatio: 'auto', height: IMAGE_HEIGHT }}>
            <div className={cardClasses.coverOrnament}>✦</div>
            <Text className={cardClasses.coverTitle} lineClamp={3}>{poetry.title}</Text>
        </div>
    );

    return (
        <Card shadow="sm" padding="lg" radius="md" key={poetry.id} withBorder>
            <Card.Section>
                <If condition={poetry.links?.image && !imgError} elseChildren={cover}>
                    <Image h={IMAGE_HEIGHT} radius="sm" src={poetry?.links?.image} onError={() => setImgError(true)} />
                </If>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text component={Link} to={`/libraries/${libraryId}/writings/${poetry.id}`} truncate="end" fw={500}>{poetry.title}</Text>
                <FavoriteButton poetry={poetry} readonly />
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
                <AuthorsAvatar libraryId={libraryId} authors={poetry?.authors} />
            </Group>
        </Card>
    )
}

PoetryCard.propTypes = {
    libraryId: PropTypes.string,
    poetry: PropTypes.shape({
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

export default PoetryCard