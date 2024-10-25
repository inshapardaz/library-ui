import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { Avatar, Group, Stack, Table, Text, Tooltip } from '@mantine/core';

// Local Imports
import { IconWorld, IconLibrary } from '@/components/icon';
//-------------------------------------

const LibraryListItem = ({ library }) => {
    const { t } = useTranslation();

    return (<Table.Tr>
        <Table.Td>
            <Group gap="sm">
                <Avatar size={64} radius={30} ><IconLibrary /></Avatar>
                <Stack>
                    <Text component={Link} to={`/libraries/${library.id}`} truncate="end" fw={500}>{library.name}</Text>
                    {library?.description ?
                        (<Tooltip label={library.description} withArrow>
                            <Text size="sm" c="dimmed" lineClamp={1}>
                                {library.description}
                            </Text>
                        </Tooltip>) :
                        (<Text size="sm" fs="italic" c="dimmed" lineClamp={1}>
                            {t('library.noDescription')}
                        </Text>)}
                </Stack>
            </Group>
        </Table.Td>
        <Table.Td>
            <Group>
                <IconWorld />
                {t(`languages.${library.language}`)}
            </Group>
        </Table.Td>
    </Table.Tr>)
}

LibraryListItem.propTypes = {
    library: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        language: PropTypes.string
    })
}

export default LibraryListItem;