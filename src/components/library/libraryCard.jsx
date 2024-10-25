import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';

// Local Imports
import classes from './libraryCard.module.css';
import librarySvg from '@/assets/icons/building-arch.svg';
import { IconWorld } from '@/components/icon';
//-------------------------------------

const LibraryCard = ({ library }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();

    return (<Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        component={Link}
        to={`/libraries/${library.id}`}
    >
        <div
            className={classes.image}
            style={{
                backgroundImage:
                    `url(${library?.links?.image || librarySvg})`,
            }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
            <div>
                <Text size="lg" className={classes.title} fw={500}>
                    {library.name}
                </Text>

                <Group justify="space-between" gap="xs">

                    <Text size="sm" className={classes.author}
                        truncate="end" >
                        {library?.description || t('library.noDescription')}
                    </Text>

                    <Group gap="lg">
                        <Center>
                            <IconWorld
                                size={16}
                                stroke={1.5}
                                color={theme.colors.dark[2]}
                            />
                            <Text size="sm" className={classes.bodyText}>
                                {t(`languages.${library.language}`)}
                            </Text>
                        </Center>
                    </Group>
                </Group>
            </div>
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