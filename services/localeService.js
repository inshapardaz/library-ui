import urPK from 'antd/locale/ur_PK';
import enGB from 'antd/locale/en_GB';

const languages = {
    'en'  : { key:"en", locale:'en_GB', name: 'English', dir : 'ltr', flag: 'gb', antdLocale : enGB },
    'ur'  : { key:"ur", locale:'ur_PK', name: 'اردو', dir : 'rtl', flag: 'pk' , antdLocale : urPK },
    //'pn'  : { key:"pn", locale:'pa_Arab', name: 'پنجابی - شاہ مکھی', dir : 'rtl', flag: 'pk' },
    //'png' : { key:"png", locale:'pa_Guru', name: 'ਪੰਜਾਬੀ - ਗੁਰਮੁਖੀ', dir : 'ltr', flag: 'in' },
}


const getLanguage = (locale) => 
{
    return languages[locale] ?? languages['en'];
}

const getSupportedLanguages = ()  =>{
    return languages;
}

const localeService = { getLanguage, getSupportedLanguages };
export default localeService;