import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// UI Library Imports
import { Button, Menu, ActionIcon } from "@mantine/core";

// Local Imports
import { IconReaderText, IconReaderImage, IconChevronDown } from '@/components/icon';
import If from '@/components/if';
import BookFormat from '@/models/bookFormat';
import { accountUrl } from '@/utils/returnUrl';
//------------------------------------------------------

// The primary action of a book: Read (with a format menu when there are several formats) for
// signed-in readers, "Sign in to read" for everyone else, since reading needs a login.
const BookReadButton = ({ libraryId, book }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    if (!book) {
        return null;
    }

    if (!user) {
        return (
            <Button component="a" href={accountUrl('/account/login')} leftSection={<IconReaderText />}>
                {t('login.signInToRead')}
            </Button>
        );
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

    return (<>
        <If condition={readOptions.length === 1}>
            <Button leftSection={readOptions[0]?.icon} onClick={() => goToOption(readOptions[0])}>{t('book.actions.read.title')}</Button>
        </If>

        <If condition={readOptions.length > 1}>
            <Button.Group>
                <Button leftSection={readOptions[0]?.icon} onClick={() => goToOption(readOptions[0])}>{t('book.actions.read.title')}</Button>
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
</>);
};

BookReadButton.propTypes = {
    libraryId: PropTypes.string,
    book: PropTypes.shape({
        id: PropTypes.number,
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

export default BookReadButton;
