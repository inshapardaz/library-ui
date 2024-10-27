import PropTypes from 'prop-types';
//-------------------------------------

import ArrowLeftSvg from '@/assets/icons/arrow-left.svg';
import BookSvg from '@/assets/icons/book.svg';
import BooksSvg from '@/assets/icons/books.svg';
import BlockQuoteSvg from '@/assets/icons/blockquote.svg';
import BrandInstagramSvg from '@/assets/icons/brand-instagram.svg';
import BrandTwitterSvg from '@/assets/icons/brand-twitter.svg';
import BrandYoutubeSvg from '@/assets/icons/brand-youtube.svg';
import BuildingArchSvg from '@/assets/icons/building-arch.svg';
import CategorySvg from '@/assets/icons/category.svg';
import ChevronDownSvg from '@/assets/icons/chevron-down.svg';
import ChevronUpSvg from '@/assets/icons/chevron-up.svg';
import CopyrightsSvg from '@/assets/icons/copyright.svg';
import FeatherSvg from '@/assets/icons/feather.svg';
import FingerprintSvg from '@/assets/icons/fingerprint.svg';
import FilesSvg from '@/assets/icons/files.svg';
import HomeSvg from '@/assets/icons/home.svg';
import InfoCircleSvg from '@/assets/icons/info-circle.svg';
import LanguageSvg from '@/assets/icons/language.svg';
import LayoutGridSvg from '@/assets/icons/layout-grid.svg';
import LayoutListSvg from '@/assets/icons/layout-list.svg';
import LogoutSvg from '@/assets/icons/logout.svg';
import MoonSvg from '@/assets/icons/moon.svg';
import PublisherSvg from '@/assets/icons/publisher.svg';
import RefreshAlertSvg from '@/assets/icons/refresh-alert.svg';
import SearchSvg from '@/assets/icons/search.svg';
import SettingsSvg from '@/assets/icons/settings.svg';
import SunSvg from '@/assets/icons/sun.svg';
import SwitchHorizontalSvg from '@/assets/icons/switch-horizontal.svg';
import TagsSvg from '@/assets/icons/tags.svg';
import ToolsSvg from '@/assets/icons/tools.svg';
import TypographySvg from '@/assets/icons/typography.svg';
import UserEditSvg from '@/assets/icons/user-edit.svg';
import VersionsSvg from '@/assets/icons/versions.svg';
import VocabularySvg from '@/assets/icons/vocabulary.svg';
import WorldSvg from '@/assets/icons/world.svg';
import { rem } from '@mantine/core';
//-------------------------------------

const Icon = ({ src, size = 24, className = '', style = {}, stroke = 1 }) => {

    return (
        <img
            src={src}
            width={rem(size)}
            height={rem(size)}
            className={className}
            style={{ height: rem(size), width: rem(size), ...style }}
            stroke={stroke}
        />
    );
};

export default Icon;
//-------------------------------------

Icon.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    stroke: PropTypes.number,
};
//-------------------------------------

export const IllustrationError = <svg width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g transform="translate(24 31.67)"><ellipse fillOpacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>

export const IconArrowLeft = (props) => (<Icon src={ArrowLeftSvg} {...props} />)
export const IconBook = (props) => (<Icon src={BookSvg} {...props} />)
export const IconBooks = (props) => (<Icon src={BooksSvg} {...props} />)
export const IconBlockQuote = (props) => (<Icon src={BlockQuoteSvg} {...props} />)
export const IconBrandInstagram = (props) => (<Icon src={BrandInstagramSvg} {...props} />)
export const IconBrandTwitter = (props) => (<Icon src={BrandTwitterSvg} {...props} />)
export const IconBrandYoutube = (props) => (<Icon src={BrandYoutubeSvg} {...props} />)
export const IconCategory = (props) => (<Icon src={CategorySvg} {...props} />)
export const IconChevronDown = (props) => (<Icon src={ChevronDownSvg} {...props} />)
export const IconChevronUp = (props) => (<Icon src={ChevronUpSvg} {...props} />)
export const IconCopyrights = (props) => (<Icon src={CopyrightsSvg} {...props} />)
export const IconDictionary = (props) => (<Icon src={VocabularySvg} {...props} />)
export const IconFeather = (props) => (<Icon src={FeatherSvg} {...props} />)
export const IconFiles = (props) => (<Icon src={FilesSvg} {...props} />)
export const IconFingerprint = (props) => (<Icon src={FingerprintSvg} {...props} />)
export const IconFont = (props) => (<Icon src={TypographySvg} {...props} />)
export const IconHome = (props) => (<Icon src={HomeSvg} {...props} />)
export const IconInfoCircle = (props) => (<Icon src={InfoCircleSvg} {...props} />)
export const IconLanguage = (props) => (<Icon src={LanguageSvg} {...props} />)
export const IconLibrary = (props) => (<Icon src={BuildingArchSvg} {...props} />)
export const IconLayoutList = (props) => (<Icon src={LayoutListSvg} {...props} />)
export const IconLayoutGrid = (props) => (<Icon src={LayoutGridSvg} {...props} />)
export const IconLogout = (props) => (<Icon src={LogoutSvg} {...props} />)
export const IconMoon = (props) => (<Icon src={MoonSvg} {...props} />)
export const IconPublisher = (props) => (<Icon src={PublisherSvg} {...props} />)
export const IconRefreshAlert = (props) => (<Icon src={RefreshAlertSvg} {...props} />)
export const IconSearch = (props) => (<Icon src={SearchSvg} {...props} />)
export const IconSettings = (props) => (<Icon src={SettingsSvg} {...props} />)
export const IconSun = (props) => (<Icon src={SunSvg} {...props} />)
export const IconSwitchHorizontal = (props) => (<Icon src={SwitchHorizontalSvg} {...props} />)
export const IconTags = (props) => (<Icon src={TagsSvg} {...props} />)
export const IconTools = (props) => (<Icon src={ToolsSvg} {...props} />)
export const IconVersions = (props) => (<Icon src={VersionsSvg} {...props} />)
export const IconUserEdit = (props) => (<Icon src={UserEditSvg} {...props} />)
export const IconWorld = (props) => (<Icon src={WorldSvg} {...props} />)
