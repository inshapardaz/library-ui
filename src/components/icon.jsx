// import PropTypes from 'prop-types';
import { Icon } from '@iconify-icon/react';

//-------------------------------------

const iconTheme = {
    "tabler": {
        home: "home",
        library: "building-arch",
        libraryEdit: "home-edit",
        dictionary: "notebook",
        font: "typography",
        tools: "tools",
        moon: "moon",
        sun: "sun",
        settings: "settings",
        changePassword: "password",
        logout: "logout",
        search: "search",
        book: "book",
        books: "books",
        author: "user",
        authors: "users",
        writing: "blockquote",
        writings: "blockquote",
        category: "tag",
        categories: "tags",
        series: "stack-2",
        periodical: "news",
        periodicals: "news",
        layoutList: "layout-list",
        layoutGrid: "layout-grid",
        infoCircle: "info-circle",
        chevronUp: "chevron-up",
        chevronDown: "chevron-down",
        chevronLeft: "chevron-left",
        chevronRight: "chevron-right",
        world: "world",
        language: "language",
        copyright: "copyright",
        pages: "notes",
        publisher: "book-upload",
        chapters: "versions",
        arrowLeft: "arrow-left",
        calendar: "calendar",
        reloadAlert: "refresh-alert",
        x: "x",
        heart: "heart",
        heartFill: "heart-filled",
        alert: "alert-triangle",
        imageReader: "photo",
        textReader: "file-text",
        readerScrollView: "invoice",
        readerSinglePage: "file-text",
        readerDoublePage: "book",
        fullScreen: "arrows-maximize",
        exitFullScreen: "arrows-minimize",
        zoomIn: "zoom-in",
        zoomOut: "zoom-out"
    }
};
//-------------------------------------

const currentIconTheme = "tabler";
const getIconName = (iconName) => `${currentIconTheme}:${iconTheme[currentIconTheme][iconName]}`
const getIcon = (name, props) => (<Icon icon={getIconName(name)}  {...props} />)
//-------------------------------------

export const IconHome = (props) => getIcon('home', props)
export const IconLibrary = (props) => getIcon('library', props)
export const IconLibraryEditor = (props) => getIcon('libraryEdit', props)
export const IconDictionary = (props) => getIcon('dictionary', props)
export const IconFont = (props) => getIcon('font', props)
export const IconTools = (props) => getIcon('tools', props)
export const IconMoon = (props) => getIcon('moon', props)
export const IconSun = (props) => getIcon('sun', props)
export const IconSettings = (props) => getIcon('settings', props)
export const IconChangePassword = (props) => getIcon('changePassword', props)
export const IconLogout = (props) => getIcon('logout', props)
export const IconSearch = (props) => getIcon('search', props)
export const IconBook = (props) => getIcon('book', props)
export const IconBooks = (props) => getIcon('books', props)
export const IconAuthor = (props) => getIcon('author', props)
export const IconAuthors = (props) => getIcon('authors', props)
export const IconWriting = (props) => getIcon('writing', props)
export const IconWritings = (props) => getIcon('writings', props)
export const IconCategory = (props) => getIcon('category', props)
export const IconCategories = (props) => getIcon('categories', props)
export const IconSeries = (props) => getIcon('series', props)
export const IconPeriodical = (props) => getIcon('periodical', props)
export const IconPeriodicals = (props) => getIcon('periodical', props)
export const IconLayoutList = (props) => getIcon('layoutList', props)
export const IconLayoutGrid = (props) => getIcon('layoutGrid', props)
export const IconInfoCircle = (props) => getIcon('infoCircle', props)
export const IconChevronDown = (props) => getIcon('chevronDown', props)
export const IconChevronUp = (props) => getIcon('chevronUp', props)
export const IconWorld = (props) => getIcon('world', props)
export const IconLanguage = (props) => getIcon('language', props)
export const IconCopyright = (props) => getIcon('copyright', props)
export const IconPages = (props) => getIcon('pages', props)
export const IconPublisher = (props) => getIcon('publisher', props)
export const IconChapters = (props) => getIcon('chapters', props)
export const IconArrowLeft = (props) => getIcon('arrowLeft', props)
export const IconCalendar = (props) => getIcon('calendar', props)
export const IconRefreshAlert = (props) => getIcon('reloadAlert', props)
export const IconArticle = (props) => getIcon('article', props)
export const IconX = (props) => getIcon('x', props)
export const IconAlert = (props) => getIcon('alert', props)
export const IconFavorite = (props) => getIcon('heart', props)
export const IconFavoriteFill = (props) => getIcon('heartFill', props)
export const IconReaderImage = (props) => getIcon('imageReader', props)
export const IconReaderText = (props) => getIcon('textReader', props)
export const IconLeft = (props) => getIcon('chevronLeft', props)
export const IconRight = (props) => getIcon('chevronRight', props)
export const IconReaderViewScroll = (props) => getIcon('readerScrollView', props)
export const IconReaderViewSinglePage = (props) => getIcon('readerSinglePage', props)
export const IconReaderViewDoublePage = (props) => getIcon('readerDoublePage', props)
export const IconFullScreen = (props) => getIcon('fullScreen', props)
export const IconFullScreenExit = (props) => getIcon('exitFullScreen', props)
export const IconZoomIn = (props) => getIcon('zoomIn', props)
export const IconZoomOut = (props) => getIcon('zoomOut', props)

//-----------------------------------------------------
// Old Icons
export const IllustrationError = <svg width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g transform="translate(24 31.67)"><ellipse fillOpacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
