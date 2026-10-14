import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';

// Local Imports
import classes from './libraryCard.module.css';
import { IconWorld } from '@/components/icon';
import { IconLibrary } from '@/components/icon';
//-------------------------------------

const LibraryCard = ({ library }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    return (<Card
        className={classes.card}
        shadow="sm" padding="lg" radius="md" withBorder
        component={Link}
        to={`/libraries/${library.id}`}
    >
        <div className={classes.content}>
            {library?.links?.image ?
                <span className={classes.icon} style={{ backgroundImage: `url(${library.links.image})`, backgroundSize: 'cover' }} /> :
                <span className={classes.icon}>
                    <IconLibrary height={18} />
                </span>}

            <Text size="lg" className={classes.title} fw={500}>
                {library.name}
            </Text>

            <Group gap="lg">
                <Center>
                    <IconWorld
                        height={16}
                        stroke={1.5}
                        style={{ color: theme.colors.dark[2] }}
                    />
                    <Text size="sm" className={classes.bodyText}>
                        {t(`languages.${library.language}`)}
                    </Text>
                </Center>
            </Group>
        </div>
    </Card >)
}

LibraryCard.propTypes = {
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        language: PropTypes.string,
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default LibraryCard;