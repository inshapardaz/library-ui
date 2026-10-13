import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

// Ui Library Imports
import { Anchor, Badge, Group, Popover, Space, Text, UnstyledButton } from '@mantine/core';

// Local Imports
import classes from './appHeader.module.css';
import { useGetCategoriesQuery } from '@/store/slices/categories.api';
import { IconChevronDown } from '@/components/icon';
//----------------------------------------------

// The "Books" entry of the header: opens the book categories (with counts) and an "All books"
// link, as in the design. Highlighted while the books listing is open.
const BooksMenu = ({ libraryId }) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const [opened, setOpened] = useState(false);
    const { data: categories } = useGetCategoriesQuery({ libraryId }, { skip: !libraryId });
    const items = (categories?.data ?? []).filter((category) => category.bookCount > 0);
    const base = `/libraries/${libraryId}/explore/books`;

    return (
        <Popover opened={opened} onChange={setOpened} position="bottom-start" shadow="md" withinPortal>
            <Popover.Target>
                <UnstyledButton
                    className={classes.link}
                    aria-current={pathname.startsWith(base) ? 'page' : undefined}
                    aria-expanded={opened}
                    onClick={() => setOpened((o) => !o)}
                >
                    {t('header.books')}
                    <Space w={4} />
                    <IconChevronDown height={14} />
                </UnstyledButton>
            </Popover.Target>
            <Popover.Dropdown miw={320} maw={420}>
                <Group justify="space-between" mb="sm">
                    <Text fw={600}>{t('explore.categories')}</Text>
                    <Anchor component={Link} to={base} size="sm" onClick={() => setOpened(false)}>
                        {t('books.allBooks')}
                    </Anchor>
                </Group>
                <Group gap="xs">
                    {items.map((category) => (
                        <Badge
                            key={category.id}
                            component={Link}
                            to={`${base}?category=${category.id}`}
                            variant="outline"
                            color="gray"
                            size="lg"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setOpened(false)}
                        >
                            {category.name} <Text span c="dimmed" inherit>{category.bookCount}</Text>
                        </Badge>
                    ))}
                </Group>
            </Popover.Dropdown>
        </Popover>
    );
};

BooksMenu.propTypes = {
    libraryId: PropTypes.string,
};

export default BooksMenu;
