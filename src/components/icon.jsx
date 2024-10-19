import PropTypes from 'prop-types';

//-------------------------------------

import ArrowLeftSvg from '@/assets/icons/arrow-left.svg';
import BookSvg from '@/assets/icons/book.svg';
import BooksSvg from '@/assets/icons/books.svg';
import BrandInstagramSvg from '@/assets/icons/brand-instagram.svg';
import BrandTwitterSvg from '@/assets/icons/brand-twitter.svg';
import BrandYoutubeSvg from '@/assets/icons/brand-youtube.svg';
import CategorySvg from '@/assets/icons/category.svg';
import ChevronDownSvg from '@/assets/icons/chevron-down.svg';
import ChevronUpSvg from '@/assets/icons/chevron-up.svg';
import FingerprintSvg from '@/assets/icons/fingerprint.svg';
import InfoCircleSvg from '@/assets/icons/info-circle.svg';
import LogoutSvg from '@/assets/icons/logout.svg';
import MoonSvg from '@/assets/icons/moon.svg';
import RefreshAlertSvg from '@/assets/icons/refresh-alert.svg';
import SearchSvg from '@/assets/icons/search.svg';
import SettingsSvg from '@/assets/icons/settings.svg';
import SunSvg from '@/assets/icons/sun.svg';
import SwitchHorizontalSvg from '@/assets/icons/switch-horizontal.svg';

//-------------------------------------

const Icon = ({ src, width = '24px', height = '24px', className = '', style = {}, stroke = 1 }) => {

    return (
        <img
            src={src}
            alt="icon"
            width={width}
            height={height}
            className={className}
            style={style}
            stroke={stroke}
        />
    );
};

export default Icon;
//-------------------------------------

Icon.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    stroke: PropTypes.number,
};

//-------------------------------------

export const IconArrowLeft = (props) => (<Icon src={ArrowLeftSvg} {...props} />)
export const IconBook = (props) => (<Icon src={BookSvg} {...props} />)
export const IconBooks = (props) => (<Icon src={BooksSvg} {...props} />)
export const IconBrandInstagram = (props) => (<Icon src={BrandInstagramSvg} {...props} />)
export const IconBrandTwitter = (props) => (<Icon src={BrandTwitterSvg} {...props} />)
export const IconBrandYoutube = (props) => (<Icon src={BrandYoutubeSvg} {...props} />)
export const IconCategory = (props) => (<Icon src={CategorySvg} {...props} />)
export const IconChevronDown = (props) => (<Icon src={ChevronDownSvg} {...props} />)
export const IconChevronUp = (props) => (<Icon src={ChevronUpSvg} {...props} />)
export const IconFingerprint = (props) => (<Icon src={FingerprintSvg} {...props} />)
export const IconInfoCircle = (props) => (<Icon src={InfoCircleSvg} {...props} />)
export const IconLogout = (props) => (<Icon src={LogoutSvg} {...props} />)
export const IconMoon = (props) => (<Icon src={MoonSvg} {...props} />)
export const IconRefreshAlert = (props) => (<Icon src={RefreshAlertSvg} {...props} />)
export const IconSearch = (props) => (<Icon src={SearchSvg} {...props} />)
export const IconSettings = (props) => (<Icon src={SettingsSvg} {...props} />)
export const IconSun = (props) => (<Icon src={SunSvg} {...props} />)
export const IconSwitchHorizontal = (props) => (<Icon src={SwitchHorizontalSvg} {...props} />)