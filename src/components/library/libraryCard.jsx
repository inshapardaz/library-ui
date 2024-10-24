import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Card, Group, Text } from '@mantine/core';

// Local Imports
import classes from './libraryCard.module.css';
import librarySvg from '@/assets/icons/building-arch.svg';
//-------------------------------------

const LibraryCard = ({ library }) => {
    const { t } = useTranslation();

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
                        {/*<Center>
                            <IconBooks
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                                color={theme.colors.dark[2]}
                            />
                            <Text size="sm" className={classes.bodyText}>
                                7847
                            </Text>
                        </Center>
                         <Center>
                            <IconUser
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                                color={theme.colors.dark[2]}
                            />
                            <Text size="sm" className={classes.bodyText}>
                                5
                            </Text>
                        </Center> */}
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
        links: PropTypes.shape({
            image: PropTypes.string
        })
    })
}

export default LibraryCard;