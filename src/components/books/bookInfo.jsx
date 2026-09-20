import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

// UI Library Imports
import { useMantineTheme, Stack, Button, Menu, ActionIcon } from "@mantine/core";

// Local Imports
import {
    IconPublisher,
    IconLanguage,
    IconWorld,
    IconPages,
    IconCopyright,
    IconCalendar,
    IconReaderText,
    IconReaderImage,
    IconChevronDown
} from '@/components/icon';

import IconText from '@/components/iconText';
import If from '@/components/if';
import BookFormat from '@/models/bookFormat';
//------------------------------------------------------

const BookInfo = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const navigate = useNavigate();

    if (!book) {
        return null;
    }

    const hasEpub = book.contents?.some((c) => c.mimeType === BookFormat.Epub) || book.chapterCount > 0;
    const hasPdf = book.contents?.some((c) => c.mimeType === BookFormat.Pdf);
    const hasMarkdown = book.contents?.some((c) => [BookFormat.Markdown, BookFormat.Text, BookFormat.Html].includes(c.mimeType));
    const hasPages = book.pageCount > 0;

    const readOptions = [
        hasEpub && { key: 'epub', label: t('book.actions.read.asEpub'), format: BookFormat.Epub, icon: <IconReaderText /> },
        hasPdf && { key: 'pdf', label: t('book.actions.read.asPdf'), format: BookFormat.Pdf, icon: <IconReaderText /> },
        hasMarkdown && { key: 'markdown', label: t('book.actions.read.asMarkdown'), format: BookFormat.Markdown, icon: <IconReaderText /> },
        hasPages && { key: 'pages', label: t('book.actions.read.asPages'), format: null, icon: <IconReaderImage /> },
    ].filter(Boolean);

    const goToOption = (option) => {
        if (option.key === 'pages') {
            navigate(`/libraries/${libraryId}/books/${book.id}/read`);
        } else {
            navigate(`/libraries/${libraryId}/books/${book.id}/ebook${option.format ? `?format=${option.format}` : ''}`);
        }
    };

    return (<Stack>
        <If condition={book.yearPublished != null}>
            <IconText size="sm" icon={<IconCalendar height={24} style={{ color: theme.colors.dark[2] }} />} text={book.yearPublished} />
        </If>
        <If condition={book.publisher != null}>
            <IconText size="sm" icon={<IconPublisher height={24} style={{ color: theme.colors.dark[2] }} />} text={book.publisher} />
        </If>
        <If condition={book.language != null}>
            <IconText size="sm" icon={<IconLanguage height={24} style={{ color: theme.colors.dark[2] }} />} text={t(`languages.${book.language}`)} />
        </If>
        <If condition={book.isPublic != null}>
            <IconText size="sm" icon={<IconWorld height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.isPublic")} />
        </If>
        <If condition={book.copyrights != null}>
            <IconText size="sm" icon={<IconCopyright height={24} style={{ color: theme.colors.dark[2] }} />} text={t(`copyrights.${book.copyrights}`)} />
        </If>
        <If condition={book.pageCount != null}>
            <IconText size="sm" icon={<IconPages height={24} style={{ color: theme.colors.dark[2] }} />} text={t("book.pageCount", { count: book.pageCount })} />
        </If>

        <If condition={readOptions.length === 1}>
            <Button fullWidth leftSection={readOptions[0]?.icon} onClick={() => goToOption(readOptions[0])}>{t('book.actions.read.title')}</Button>
        </If>

        <If condition={readOptions.length > 1}>
            <Button.Group>
                <Button fullWidth leftSection={readOptions[0]?.icon} onClick={() => goToOption(readOptions[0])}>{t('book.actions.read.title')}</Button>
                <Menu position="bottom-end" withinPortal>
                    <Menu.Target>
                        <ActionIcon size={36} variant="filled"><IconChevronDown /></ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {readOptions.map((option) => (
                            <Menu.Item key={option.key} leftSection={option.icon} onClick={() => goToOption(option)}>
                                {option.label}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            </Button.Group>
        </If>
    </Stack>);
};

BookInfo.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
        publisher: PropTypes.string,
        yearPublished: PropTypes.number,
        language: PropTypes.string,
        isPublic: PropTypes.bool,
        copyrights: PropTypes.string,
        pageCount: PropTypes.number,
        chapterCount: PropTypes.number,
        contents: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            bookId: PropTypes.number,
            fileName: PropTypes.string,
            mimeType: PropTypes.string,
            language: PropTypes.string,
        }))
    })
};

export default BookInfo;
