import cx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Text, Group } from '@mantine/core';
import classes from './tableOfContents.module.css';
import { Link } from 'react-router-dom';

const TableOfContents = ({ title, links, selectedKey, onSelected }) => {
    const items = links.map((item) => (
        <Box component={Link}
            to={item.link}
            onClick={(event) => {
                if (onSelected) {
                    onSelected(item)
                }

                event.preventDefault()
            }}
            key={item.key}
            className={cx(classes.link, { [classes.linkActive]: selectedKey == item.key })}
            style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
        >
            <Group gap="xs" wrap='nowrap'>{item.icon}{item.label}</Group>
        </Box >
    ));

    return (
        <div>
            <Group mb="md">
                <Text>{title}</Text>
            </Group>
            {items}
        </div>
    );
}

TableOfContents.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        label: PropTypes.node,
        link: PropTypes.string,
        icon: PropTypes.node,
        order: PropTypes.number,
    })),
    onSelected: PropTypes.func,
    title: PropTypes.string,
    selectedKey: PropTypes.any
}

export default TableOfContents;